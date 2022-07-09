import { AccessTokenPayload, ResponseData, Token } from "../../data/models";
import { ResultCode } from "../../utils";
import { adminRepository, refreshTokenRepository } from "../../repositories";
import jwt from "jsonwebtoken";
import bcryptjs = require("bcryptjs");
import { Admin } from "../../models";
import moment = require("moment");

const ACCESS_TOKEN_EXPIRED_IN_TIME = 60 * 60 * 24 * 2; //2 Days
const REFRESH_TOKEN_EXPIRED_IN_TIME = 60 * 60 * 24 * 3; //3 Days

export class AdminAuthService {
  async login(username: string, password: string): Promise<ResponseData> {
    let res: ResponseData;

    const admin = await adminRepository.getAdminByUsername(username);
    const isMatch = await bcryptjs.compare(
      password,
      admin ? admin.password : ""
    );

    if (!admin || !isMatch) {
      return (res = {
        status: ResultCode.NOT_FOUND,
        message: "Username or password is not correct",
      });
    }

    const token = this.generateToken(admin);
    const saveTokenResult = (await refreshTokenRepository.saveRefreshToken(
      "",
      token.refreshToken.token,
      admin.id
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
        const token = await refreshTokenRepository.getAdminRefreshToken(
          refreshToken
        );

        if (token && token.admin) {
          await refreshTokenRepository.usedRefreshToken(token.token);
          const newToken = this.generateToken(token.admin);
          await refreshTokenRepository.saveRefreshToken(
            token.admin.id,
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

  private generateToken(admin: Admin): Token {
    const accessPayload: AccessTokenPayload = {
      id: admin.id,
      username: admin.username,
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
        permission: "admin",
      },
    };
  }
}
