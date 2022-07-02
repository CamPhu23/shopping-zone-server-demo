import { AccessTokenPayload, ResponseData, Token } from "../data/models";
import { clientRepository, receiptRepository } from "../repositories";
import { ResultCode } from "../utils";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../utils/default-value";

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
      console.log(error);
      if (error.codeName == "DupicateKey") {
        return this.response = {
          status: ResultCode.BAD_INPUT_DATA,
          message: "Email duplicate"
        }
      }
      else {
        return this.response = {
          status: ResultCode.FAILED,
          message: error.message || 'Underfined error'
        }
      }
    }
  }

  async getAllReceiptByUserId(id: string, page: string, size: string): Promise<ResponseData> {
    try {
      let s = parseInt(size);
      let p = parseInt(page);

      const receipts = await receiptRepository.getAllReceitUserId(id, p, s);
      const numOfReceipt = await receiptRepository.countAllReceiptById(id);

      return this.response = {
        status: ResultCode.SUCCESS,
        result: {
          receipts,
          info: {
            currentIndex: p,
            total: Math.ceil(numOfReceipt / s),
          }
        }
      }
    } catch (error: any) {
      return this.response = {
        status: ResultCode.FAILED,
        message: error.message || 'Underfined error'
      }
    }
  }

  async getReceiptById(id: string): Promise<ResponseData> {
    try {
      const receipt = await receiptRepository.getReceitById(id);

      return this.response = {
        status: ResultCode.SUCCESS,
        result: receipt
      }
    }
    catch (error: any) {
      return this.response = {
        status: ResultCode.FAILED,
        message: error.message || 'Underfined error'
      }
    }
  }

  async getInforUser(token: string): Promise<any> {
    let res: ResponseData;
    let accountFromToken: any;
    let fullAccount: any;
    // check if user is logged in and token is not expired 
    accountFromToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string);

    // get infor client from id(id: get from token)
    fullAccount = await clientRepository.getClientById(accountFromToken.id)

    if (fullAccount != null) {
      return (res = {
        status: ResultCode.SUCCESS,
        result: fullAccount
      });
    }
  }
}
