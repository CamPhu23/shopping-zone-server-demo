import { Schema, model, Types } from "mongoose";
import { Receipt } from "./receipt-model";
import { RefreshToken } from "./refresh-token-model";

interface IClient {
  username: string;
  password: string;
  email: string | null;
  fullname: string | null;
  phone: string | null;
  address: string | null;
  isDelete: boolean;
  refreshToken: Types.ObjectId;
  receipts: Types.ObjectId[];
}

export class Client {
  id: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  isDelete: boolean;
  refreshToken: RefreshToken[] | null;
  receipts: Receipt[];

  static fromData(data: any): Client {
    const client = new Client();

    client.id = data.id as string;
    client.username = data.username;
    client.password = data.password;
    client.email = data.email || "";
    client.fullname = data.fullname || "";
    client.phone = data.phone || "";
    client.address = data.address || "";
    client.isDelete = data.isDelete || false;
    client.refreshToken = data.refreshToken
      ? data.refreshToken.map((refresh: any): RefreshToken => {
        return RefreshToken.fromData(refresh);
      })
      : null;
    client.receipts = data.receipt
      ? data.receipt.map((receipt: any): Receipt => {
        return Receipt.fromData(receipt);
      })
      : null;

    return client;
  }
}

const schema = new Schema<IClient>({
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

  phone: {
    type: String,
  },

  address: {
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

  receipts: [
    {
      type: Schema.Types.ObjectId,
      ref: "receipts",
    },
  ],
});

export const ClientModel = model<IClient>("clients", schema);
