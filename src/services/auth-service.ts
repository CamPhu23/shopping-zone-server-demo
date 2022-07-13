import { AccessTokenPayload, ResponseData, Token } from "../data/models";
import { ResultCode } from "../utils";
import { clientRepository, refreshTokenRepository } from "../repositories";
import jwt from "jsonwebtoken";
import bcryptjs = require("bcryptjs");
import { Client } from "../models";
import moment = require("moment");
import sendRegistrationMail  from "./mail/registration-service";
import resetPasswordMail from "./mail/reset-password-service";
import _ = require("lodash");

const ACCESS_TOKEN_EXPIRED_IN_TIME = 60 * 30; //30 Mins
const REFRESH_TOKEN_EXPIRED_IN_TIME = 60 * 60 * 24 * 3; //3 Days

export class AuthService {
  async login(username: string, password: string): Promise<ResponseData> {
    let res: ResponseData;

    const client = await clientRepository.getClientByUsername(username);
    const isMatch = await bcryptjs.compare(
      password,
      client ? client.password : ""
    );

    if (!client || !isMatch) {
      return (res = {
        status: ResultCode.NOT_FOUND,
        message: "Username or password is not correct",
      });
    }

    const token = this.generateToken(client);
    const saveTokenResult = (await refreshTokenRepository.saveRefreshToken(
      client.id,
      token.refreshToken.token
    ))
      ? true
      : false;

    return (res = {
      status: saveTokenResult ? ResultCode.SUCCESS : ResultCode.FAILED,
      result: token,
    });
  }

  async googleLogin(email: string, fullname: string): Promise<ResponseData> {
    let res: ResponseData;

    const client = await clientRepository.getClientByEmail(email);

    let token;
    let saveTokenResult;

    if (!client) {
      const newClient = await clientRepository
        .saveGoogleClient(email, fullname);

      if (!_.isNull(newClient)) {
        token = this.generateToken(newClient);

        saveTokenResult = (await refreshTokenRepository.saveRefreshToken(
          newClient.id,
          token.refreshToken.token
        ))
          ? true
          : false;
      }
      
    }
    else {
      token = this.generateToken(client);
      saveTokenResult = (await refreshTokenRepository.saveRefreshToken(
        client.id,
        token.refreshToken.token
      ))
        ? true
        : false;
    }

    return (res = {
      status: saveTokenResult ? ResultCode.SUCCESS : ResultCode.FAILED,
      result: token,
    });
  }

  async refreshToken(refreshToken: string): Promise<ResponseData> {
    try {
      let res: ResponseData;

      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string
      );

      if (payload) {
        const token = await refreshTokenRepository.getRefreshToken(
          refreshToken
        );

        if (token && token.client) {
          await refreshTokenRepository.usedRefreshToken(token.token);
          const newToken = this.generateToken(token.client);
          await refreshTokenRepository.saveRefreshToken(
            token.client.id,
            newToken.refreshToken.token
          );

          return (res = {
            status: ResultCode.SUCCESS,
            result: newToken,
          });
        }
      }

      return (res = {
        status: ResultCode.FAILED,
        message: "Invalid refresh token",
      });
    }
    catch (error: any) {
      const { message } = error || "Undefined error";

      return {
        status: ResultCode.FAILED,
        message,
      };
    }
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<ResponseData> {
    let res: ResponseData;
    try {

      const hashedPassword = await bcryptjs.hash(password, 12);
      const newClient = await clientRepository.saveClient(
        username,
        email,
        hashedPassword
      );
      // Send notification for successfully register.
      sendRegistrationMail(email);
      
      return newClient
        ? (res = {
          status: ResultCode.SUCCESS,
          result: this.generateToken(newClient),
        })
        : (res = {
          status: ResultCode.FAILED,
          message: "An unknown error occurred",
        });
    } catch (error: any) {
      const { message, code } = error;

      return code == 11000 //code = 11000 it's mean mongoose throw duplicated error
        ? (res = {
          status: ResultCode.BAD_INPUT_DATA,
          message: "Username or email already exist",
        })
        : (res = {
          status: ResultCode.FAILED,
          message: message || "Undefined error",
        });
    }
  }

  // Forgot password function
  async forgotPassword(email: string): Promise<ResponseData> {
    let res: ResponseData
    const client = await clientRepository.getClientByEmail(email);
    if (!client) {
      return (res = {
        status: ResultCode.NOT_FOUND,
        message: "Email does not exist in the system"
      })
    }
    else {
      const payload = {
        email: client.email
      }

      resetPasswordMail(payload.email, payload);
      
      return (res = {
        status: ResultCode.SUCCESS,
      })
    }
  }

  async resetPassword(email: string, password: string): Promise<ResponseData> {
    let res: ResponseData;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newClient = await clientRepository.resetPassword(email, hashedPassword);

    return newClient
      ? (res = {
        status: ResultCode.SUCCESS,
        result: newClient
      })
      : (res = {
        status: ResultCode.FAILED,
        message: "Fail to reset password"
      })
  }

  private generateToken(client: Client): Token {
    const accessPayload: AccessTokenPayload = {
      id: client.id,
      username: client.username,
    };

    const accessToken = jwt.sign(
      accessPayload,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string,
      { algorithm: "HS256", expiresIn: ACCESS_TOKEN_EXPIRED_IN_TIME }
    );

    const refreshToken = jwt.sign(
      {},
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string,
      { algorithm: "HS256", expiresIn: REFRESH_TOKEN_EXPIRED_IN_TIME }
    );

    return {
      accessToken: {
        token: accessToken,
        expiredTime: moment()
          .add(ACCESS_TOKEN_EXPIRED_IN_TIME, "seconds")
          .format(),
      },
      refreshToken: {
        token: refreshToken,
        expiredTime: moment()
          .add(REFRESH_TOKEN_EXPIRED_IN_TIME, "seconds")
          .format(),
      },
      user: {
        permission: "client",
      },
    };
  }
}
