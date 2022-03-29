import { AccessTokenPayload, ResponseData, Token } from "../data/models";
import { ResultCode } from "../utils";
import { clientRepository, refreshTokenRepository } from "../repositories";
import jwt from "jsonwebtoken";
import bcryptjs = require("bcryptjs");
import { Client } from "../models";
import moment = require("moment");

const ACCESS_TOKEN_EXPIRED_IN_TIME = 60 * 5; //5 Mins
const REFRESH_TOKEN_EXPIRED_IN_TIME = 60 * 60 * 24 * 3; //3 Days

export class AuthService {
  private response: ResponseData;

  async login(username: string, password: string): Promise<ResponseData> {
    const client = await clientRepository.getClientByUsername(username);
    const isMatch = await bcryptjs.compare(
      password,
      client ? client.password : ""
    );

    if (!client || !isMatch) {
      return (this.response = {
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

    return (this.response = {
      status: saveTokenResult ? ResultCode.SUCCESS : ResultCode.FAILED,
      result: token,
    });
  }

  async refreshToken(refreshToken: string): Promise<ResponseData> {
    try {
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

          return (this.response = {
            status: ResultCode.SUCCESS,
            result: newToken,
          });
        }
      }

      return (this.response = {
        status: ResultCode.FAILED,
        message: "Invalid refresh token",
      });
    } catch (error: any) {
      const { message } = error || "Undefined error";

      return (this.response = {
        status: ResultCode.FAILED,
        message,
      });
    }
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<ResponseData> {
    try {
      const hashedPassword = await bcryptjs.hash(password, 12);
      const newClient = await clientRepository.saveClient(
        username,
        email,
        hashedPassword
      );

      return newClient
        ? (this.response = {
            status: ResultCode.SUCCESS,
            result: this.generateToken(newClient),
          })
        : (this.response = {
            status: ResultCode.FAILED,
            message: "An unknown error occurred",
          });
    } catch (error: any) {
      const { message, code } = error;

      return code == 11000 //code = 11000 it's mean mongoose throw duplicated error
        ? (this.response = {
            status: ResultCode.BAD_INPUT_DATA,
            message: "Username or email already exist",
          })
        : (this.response = {
            status: ResultCode.FAILED,
            message: message || "Undefined error",
          });
    }
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
        id: client.id,
        username: client.username,
        email: client.email,
        permission: "client",
      },
    };
  }
}
