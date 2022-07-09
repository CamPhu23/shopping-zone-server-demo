import { Client, ClientModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ClientRepository extends BaseRepository {
  async getClientByUsername(username: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ username, isDelete: false });
    return client ? Client.fromData(client) : null;
  }

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

  // forgot password
  async getClientByEmail(email: string): Promise<Client | null>{
    const client = await ClientModel.findOne({email, isDelete: false});
    return client ? Client.fromData(client) : null;
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

  // Change password through email
  async resetPassword(email: string, password: string): Promise<Client | null>{
    const saveNewPassword = await ClientModel.findOneAndUpdate({email: email}, {password: password}, {new: true})
    return saveNewPassword ? Client.fromData(saveNewPassword): null;
  }
}
