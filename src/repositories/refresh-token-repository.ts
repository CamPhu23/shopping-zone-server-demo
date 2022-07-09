import _ from "lodash";
import { RefreshToken, RefreshTokenModel } from "../models";
import { BaseRepository } from "./base-repository";

export class RefreshTokenRepository extends BaseRepository {
  async getRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await RefreshTokenModel.findOne({
      token,
      isUsed: false
    }).select('-_v').populate('client');

    return refreshToken ? RefreshToken.fromData(refreshToken) : null;
  }

  async saveRefreshToken(client: string = "", token: string, admin: string = ""): Promise<RefreshToken | null> {
    let result;

    if (!_.isEmpty(client)) {
      result = await RefreshTokenModel.create({
        client,
        token,
        isUsed: false
      });
    } else {
      result = await RefreshTokenModel.create({
        admin,
        token,
        isUsed: false
      });
    }

    return result ? RefreshToken.fromData(result) : null;
  };

  async usedRefreshToken(token: string): Promise<boolean> {
    const result = await RefreshTokenModel.updateOne({token}, {isUsed: true});
    return result.modifiedCount == 1;
  }

  async getAdminRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await RefreshTokenModel.findOne({
      token,
      isUsed: false
    }).select('-_v').populate('admins');

    return refreshToken ? RefreshToken.fromData(refreshToken) : null;
  }
}
