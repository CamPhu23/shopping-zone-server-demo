import { Client, ClientModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ClientRepository extends BaseRepository {
  async getClientByUsername(username: string): Promise<Client | null> {
    const client = await ClientModel.findOne({username, isDelete: false});
    return client ? Client.fromData(client) : null;
  };
}