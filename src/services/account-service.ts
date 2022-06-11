import { AccessTokenPayload, ResponseData, Token } from "../data/models";
import { ResultCode } from "../utils";
import { clientRepository } from "../repositories";
import { Client } from "../models";
import moment = require("moment");
import { result } from "lodash";

export class AccountService {
    private response: ResponseData;
    async updateInforUserById(id: string, fullname: string, email: string, phone: string, address: string): Promise<any> {
        try {
            const updateInforUser = await clientRepository.updateInforUserById(id, fullname, email, phone, address);
            return this.response = {
                status: ResultCode.SUCCESS,
                result: updateInforUser
            }
        } catch (error: any) {
            return this.response = {
                status: ResultCode.FAILED,
                message: error.message || 'Underfined error'
            }
        }
        // const client = await clientRepository.getClientByUsername(username);
    
  }

}
