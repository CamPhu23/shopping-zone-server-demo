import { Client, ClientModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ClientRepository extends BaseRepository {
  async getClientByUsername(username: string): Promise<Client | null> {
    const client = await ClientModel.findOne({username, isDelete: false});
    return client ? Client.fromData(client) : null;
  };
  
  async updateInforUserById(id: string, fullname: string, email: string, phone: string, address: string): Promise<Client | null> {
    const updateInforUser = await ClientModel.findByIdAndUpdate(id, 
        {fullname: fullname, email: email, phone: phone, address: address}, { new: true }
    );
    console.log(updateInforUser)
    return updateInforUser ? Client.fromData({
      fullname: updateInforUser.fullname,
      email: updateInforUser.email,
      phone: updateInforUser.phone,
      address: updateInforUser.address
    }) : null;
  };
}