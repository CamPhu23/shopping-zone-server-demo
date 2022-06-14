import { AccessTokenPayload, ResponseData, Token } from "../data/models";
import { clientRepository } from "../repositories";
import { ResultCode } from "../utils";
import jwt from "jsonwebtoken";
import _ from "lodash";

export class AccountService {
    private response: ResponseData;
    async updateInforUserById(id: string, fullname: string, email: string, phone: string, address: string): Promise<ResponseData> {
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

  async getInforUser(token: string): Promise<any> {
    let res: ResponseData;
    let error: string = "";
    let accountFromToken: any;
    let fullAccount: any;
    // check if user is logged in and token is not expired 
    accountFromToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string);
    
    // get infor client from id(id: get from token)
    fullAccount = await clientRepository.getClientById(accountFromToken.id)
    console.log(accountFromToken)

    if (!_.isEmpty(error)) {
      return (res = {
        status: ResultCode.NOT_AUTHORIZE,
        message: error,
      });
    }
    if(fullAccount != null) {
        return (res = {
            status: ResultCode.SUCCESS,
            result: fullAccount 
        });
    }
  }
}
