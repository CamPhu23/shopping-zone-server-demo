import _ from "lodash";
import { ReceiptModel, Receipt } from "../models";
import { BaseRepository } from "./base-repository";

export class ReceiptRepository extends BaseRepository {
  async updateStatus(receipt: any): Promise<any> {
    let isUpdated: any = false;
    isUpdated = await ReceiptModel.findOneAndUpdate({ "_id": receipt.id },
      { "status": receipt.status }, { new: true, rawResult: true });
    
    return isUpdated.lastErrorObject.updatedExisting;
  }

  async getAllReceipts(): Promise<any> {
    return await ReceiptModel
      .find({}, "id fullname phone email paymentMethod totalBill status");
  }

  async getReceipt(id: string): Promise<any> {
    let receipt = await ReceiptModel.findOne({ _id: id })
      .populate({
        path: "client",
        select: 'username',
        match: { isDelete: false }
      });

    return receipt;
  }

  async saveReceipt(receipt: any): Promise<any> {
    receipt.status = "Đang xử lý";
    var newReceipt = new ReceiptModel(receipt);
    await newReceipt.save();

    return newReceipt;
  }

  async countAll(): Promise<Number | 0> {
    return await ReceiptModel.countDocuments({});
  }
}
