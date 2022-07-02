import { Client, ClientModel, Receipt } from "../models";
import { BaseRepository } from "./base-repository";

export class ClientRepository extends BaseRepository {
  async saveClient(client: Client): Promise<Client | any> {
    let newClient = new ClientModel(client);
    await newClient.save();

    return newClient;
  }

  async getClientById(id: string): Promise<any> {
    return await ClientModel
      .findOne({ "_id": id, isDelete: false }, "id username fullname phone email address")
      .populate("receipts");
  }

  async getAllClients(): Promise<any> {
    return await ClientModel
      .find({ isDelete: false }, "_id username email fullname phone address");
  }

  async updateClient(client: any): Promise<any> {
    return await ClientModel.findOneAndUpdate(
      { _id: client._id },
      {
        "fullname": client.fullname,
        "phone": client.phone,
        "address": client.address,
      },
      { new: true }
    );
  }

  async deleteClient(id: string): Promise<Client | any> {
    let deletedClient = await ClientModel.findByIdAndUpdate({ _id: id },
      { $set: { isDelete: true } }, { new: true }).exec();

    return Client.fromData(deletedClient);
  }

  async getClientByUsername(username: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ username, isDelete: false });
    console.log(client);

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
    return await ClientModel.countDocuments({ isDelete: false });
  }

  async saveReceipt(newReceiptId: Receipt, id: string): Promise<any> {
    ClientModel.findOneAndUpdate({ "_id": id },
      { $push: { receipts: newReceiptId } },
      { new: true }, (err, product) => { });
  };
}