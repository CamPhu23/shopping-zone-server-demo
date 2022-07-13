import { ResponseData } from "../../data/models";
import { receiptRepository } from "../../repositories";
import { ResultCode } from "../../utils";

export class AdminReceiptService {
  async getAllReceipts(page: string, size: string): Promise<ResponseData> {
    let s = parseInt(size);
    let p = parseInt(page);

    let res: ResponseData;
    const receipts = await receiptRepository.getAllReceipts(p, s);
    const numOfReceipt = await receiptRepository.countAll();
    
    return (res = {
      status: ResultCode.SUCCESS,
      result: {
        receipts,
        info: {
          currentIndex: p,
          currentSize: s,
          total: numOfReceipt,
        }
      }
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