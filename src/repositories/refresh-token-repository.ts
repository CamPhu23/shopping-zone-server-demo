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

  async saveRefreshToken(client: string, token: string): Promise<RefreshToken | null> {
    const result = await RefreshTokenModel.create({
      client,
      token,
      isUsed: false
    });

    return result ? RefreshToken.fromData(result) : null;
  };

  async usedRefreshToken(token: string): Promise<boolean> {
    const result = await RefreshTokenModel.updateOne({token}, {isUsed: true});
    return result.modifiedCount == 1;
  }
}
