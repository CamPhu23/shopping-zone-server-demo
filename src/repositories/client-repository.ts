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
}
