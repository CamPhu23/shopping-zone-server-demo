import { Client, ClientModel, Receipt } from "../models";
import { BaseRepository } from "./base-repository";

export class ClientRepository extends BaseRepository {
  async getClientByUsername(username: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ username, isDelete: false });
    return client ? Client.fromData(client) : null;
  };
  
  async updateInforUserById(id: string, fullname: string, email: string, phone: string, address: string): Promise<Client | null> {
    const updateInforUser = await ClientModel.findByIdAndUpdate(id, 
        {fullname: fullname, email: email, phone: phone, address: address}, { new: true }
    );

    return updateInforUser ? Client.fromData({
      id: id,
      fullname: updateInforUser.fullname,
      email: updateInforUser.email,
      phone: updateInforUser.phone,
      address: updateInforUser.address
    }) : null;
  };

  async getClientById(id: string): Promise<Client | null> {
    const client = await ClientModel.findById(id);
    return client ? Client.fromData({
      id: id,
      fullname: client.fullname,
      email: client.email,
      phone: client.phone,
      address: client.address   
  }) : null;
  }

  async countAll(): Promise<Number | 0> {
    return await ClientModel.countDocuments({});
  }

  async saveReceipt(newReceiptId: Receipt, id: string): Promise<any> {
    ClientModel.findOneAndUpdate({ "_id": id },
      { $push: { receipts: newReceiptId } },
      { new: true }, (err, product) => { });
  };
}