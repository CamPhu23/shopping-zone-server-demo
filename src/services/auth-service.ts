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
    } catch (error: any) {
      const { message } = error || "Undefined error";

      return {
        status: ResultCode.FAILED,
        message,
      };
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
        permission: "client",
      },
    };
  }
}
