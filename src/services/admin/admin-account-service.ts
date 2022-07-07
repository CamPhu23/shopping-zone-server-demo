import { AccessTokenPayload, ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";
import jwt from "jsonwebtoken";
import { clientRepository } from "../../repositories";
import { Client } from "../../models";
import bcryptjs = require("bcryptjs");

export class AdminAccountService {
  async createClient(client: Client): Promise<ResponseData> {
    let res: ResponseData;
    client.password = await bcryptjs.hash(client.password, 12);
    await clientRepository.saveClient(client);

    return (res = {
      status: ResultCode.SUCCESS
    })
  }

  
  async updateClient(product: any): Promise<ResponseData> {
    let res: ResponseData;

    await clientRepository.updateClient(product);

    return (res = {
      status: ResultCode.SUCCESS
    })
  }

  async getAllClients(): Promise<ResponseData> {
    let res: ResponseData;
    const result = await clientRepository.getAllClients();

    return (res = {
      status: ResultCode.SUCCESS,
      result
    })
  }

  async getClient(id: string): Promise<any> {
    let client = await clientRepository.getClientById(id);
    client.id = client._id as string;
    
    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: client
    };
    return result;
  }

  async deleteClient(id: string): Promise<any> {
    let client = await clientRepository.deleteClient(id);

    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: client
    };
    return result;
  }

  async getUsernameByToken(token: string): Promise<ResponseData> {
    let res: ResponseData;

    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string
    );

    const adminUserName = (payload as AccessTokenPayload).username

    return (res = {
      status: adminUserName ? ResultCode.SUCCESS : ResultCode.FAILED,
      result: adminUserName,
    });
  }
}
