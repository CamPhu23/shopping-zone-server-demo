import { Client, ClientModel, Receipt } from "../models";
import { BaseRepository } from "./base-repository";

export class ClientRepository extends BaseRepository {
  async getClientByUsername(username: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ username, isDelete: false });
    return client ? Client.fromData(client) : null;
  };

  saveReceipt(newReceiptId: Receipt, id: string): void {
    ClientModel.findOneAndUpdate({ "_id": id },
      { $push: { receipts: newReceiptId } },
      { new: true }, (err, product) => { });
  };
  
  async countAll(): Promise<Number | 0> {
    return await ClientModel.countDocuments({});
  }
}