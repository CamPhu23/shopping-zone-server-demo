import { Schema, model, Types } from "mongoose";
import { RefreshToken } from "./refresh-token-model";

interface IAdmin {
  username: string;
  password: string;
  email: string;
  fullname: string;
  isDelete: boolean;
  refreshToken: Types.ObjectId;
}

export class Admin {
  id: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  isDelete: boolean;
  refreshToken: RefreshToken[] | null;

  static fromData(data: any): Admin {
    const admin = new Admin();

    admin.id = data.id as string;
    admin.username = data.username;
    admin.password = data.password;
    admin.email = data.email;
    admin.fullname = data.fullname;
    admin.isDelete = data.isDelete || false;
    admin.refreshToken = data.refreshToken
      ? data.refreshToken.map((refresh: any): RefreshToken => {
          return RefreshToken.fromData(refresh);
        })
      : null;

    return admin;
  }
}

const schema = new Schema<IAdmin>({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  fullname: {
    type: String,
  },

  isDelete: {
    type: Boolean,
    default: false,
  },

  refreshToken: [
    {
      type: Schema.Types.ObjectId,
      ref: "refresh-tokens",
    },
  ],
});

export const AdminModel = model<IAdmin>("admins", schema);
