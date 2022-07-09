import { Admin, AdminModel } from "../models";
import { BaseRepository } from "./base-repository";

export class AdminRepository extends BaseRepository {
  async getAdminByUsername(username: string): Promise<Admin | null> {
    const client = await AdminModel.findOne({username, isDelete: false});
    return client ? Admin.fromData(client) : null;
  };
}