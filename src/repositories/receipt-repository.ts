import _ from "lodash";
import { Receipt, ReceiptModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ReceiptRepository extends BaseRepository {
  async getAllReceitUserId(id: string, page: number, size: number): Promise<Receipt[] | any> {
    return await ReceiptModel.find({ "client": id },
      "id createdAt paymentMethod totalBill status",
      { skip: (page - 1) * size, limit: size });
  }

  async getReceitById(id: string): Promise<Receipt | any> {
    return await ReceiptModel.findOne({"_id": id});
  }

  async countAllReceiptById(id: string): Promise<number | any> {
    return await ReceiptModel.countDocuments({ "client": id });
  }

  saveReceipt(receipt: object): any {
    var newReceipt = new ReceiptModel(receipt);
    newReceipt.save();

    return newReceipt;
  }
}
