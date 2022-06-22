import { ResponseData } from "../../data/models";
import { receiptRepository } from "../../repositories";
import { ResultCode } from "../../utils";

export class AdminReceiptService {
  async getAllReceipts(): Promise<ResponseData> {
    let res: ResponseData;
    const result = await receiptRepository.getAllReceipts();

    return (res = {
      status: ResultCode.SUCCESS,
      result
    })
  }

  async getReceipt(id: string): Promise<any> {
    let receipt = await receiptRepository.getReceipt(id);

    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: receipt
    };
    return result;
  }

  async updateReceipStatus(receipt: any): Promise<any> {
    let isUpdated = await receiptRepository.updateStatus(receipt);

    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: isUpdated
    };
    return result;
  }
}