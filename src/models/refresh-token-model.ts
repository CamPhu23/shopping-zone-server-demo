import {Schema, model, Types} from 'mongoose';
import { Admin } from './admin-model';
import { Client } from './client-model';

interface IRefreshToken {
  client: Types.ObjectId;
  admin: Types.ObjectId;
  token: string;
  isUsed: boolean;
}

export class RefreshToken {
  id: Types.ObjectId;
  client: Client | null;
  admin: Admin | null;
  token: string;
  isUsed: boolean;

  static fromData(data: any): RefreshToken {
    const refreshToken = new RefreshToken();

    refreshToken.id = data.id;
    refreshToken.client = data.client ? Client.fromData(data.client) : null;;
    refreshToken.client = data.admin ? Client.fromData(data.admin) : null;;
    refreshToken.token = data.token;
    refreshToken.isUsed = data.isUsed || false;

    return refreshToken;
  }
}

const schema = new Schema<IRefreshToken>({
  client: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "clients"
  },

  admin: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "admins"
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