import { Client, ClientModel, Receipt } from "../models";
import { BaseRepository } from "./base-repository";

const GOOGLE_USER = "google-user";

export class ClientRepository extends BaseRepository {
  async saveClient(
    username: string,
    email: string,
    password: string
  ): Promise<Client | null> {
    const saveResult = await ClientModel.create({ email, username, password });
    return saveResult
      ? Client.fromData({
        id: saveResult.id,
        username: saveResult.username,
        email: saveResult.email,
        password: saveResult.password,
      })
      : null;
  }

  async saveGoogleClient(
    email: string,
    fullname: string,
  ): Promise<Client | null> {
    const saveResult = await ClientModel
      .create({ email, fullname});
    return saveResult
      ? Client.fromData({
        id: saveResult.id,
        email: saveResult.email,
        fullname: saveResult.fullname,
        username: GOOGLE_USER,
      })
      : null;
  }

  // forgot password
  async getClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email, isDelete: false });
    return client ? Client.fromData(client) : null;
  }

  // Change password through email
  async resetPassword(email: string, password: string): Promise<Client | null> {
    const saveNewPassword = await ClientModel.findOneAndUpdate({ email: email }, { password: password }, { new: true })
    return saveNewPassword ? Client.fromData(saveNewPassword) : null;
  }

  async adminSaveClient(client: Client): Promise<Client | any> {
    let newClient = new ClientModel(client);
    await newClient.save();

    return newClient;
  }

  async getClientById(id: string): Promise<any> {
    return await ClientModel
      .findOne({ "_id": id, isDelete: false }, "id username fullname phone email address")
      .populate("receipts");
  }

  async getAllClients(page: number, size: number): Promise<any> {
    return await ClientModel
      .find({ isDelete: false }, "_id username email fullname phone address",
        { skip: (page - 1) * size, limit: size })
      .sort({ createdAt: -1 });
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
      { fullname: fullname, email: email, phone: phone, address: address }, { new: true }
    );

    return updateInforUser ? Client.fromData({
      id: id,
      fullname: updateInforUser.fullname,
      email: updateInforUser.email,
      phone: updateInforUser.phone,
      address: updateInforUser.address
    }) : null;
  };

  async countAll(): Promise<Number | 0> {
    return await ClientModel.countDocuments({ isDelete: false });
  }

  async saveReceipt(newReceiptId: Receipt, id: string): Promise<any> {
    ClientModel.findOneAndUpdate({ "_id": id },
      { $push: { receipts: newReceiptId } },
      { new: true }, (err, client) => { console.log(err) });
  };

  async getClientByMonthAndYear(): Promise<any> {
    return await ClientModel.aggregate([
      {
        $match: {
          "isDelete": {
            $eq: false,
          },
        }
      },
      {
        $group: {
          _id: { $substr: ['$createdAt', 5, 2] },
          numberofclients: { $sum: 1 }
        }
      }
    ]);
  }
}
