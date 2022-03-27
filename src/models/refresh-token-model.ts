import {Schema, model, Types} from 'mongoose';
import { Client } from './client-model';

interface IRefreshToken {
  client: Types.ObjectId;
  token: string;
  isUsed: boolean;
}

export class RefreshToken {
  id: Types.ObjectId;
  client: Client | null;
  token: string;
  isUsed: boolean;

  static fromData(data: any): RefreshToken {
    const refreshToken = new RefreshToken();

    refreshToken.id = data.id;
    refreshToken.client = data.client ? Client.fromData(data.client) : null;;
    refreshToken.token = data.token;
    refreshToken.isUsed = data.isUsed || false;

    return refreshToken;
  }
}

const schema = new Schema<IRefreshToken>({
  client: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "clients"
  },

  token: {
    type: String,
    required: true,
  },

  isUsed: {
    type: Boolean,
    default: false,
  },
});

export const RefreshTokenModel = model<IRefreshToken>('refresh-tokens', schema);