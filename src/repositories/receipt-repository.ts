import _ from "lodash";
import { ReceiptModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ReceiptRepository extends BaseRepository {
  saveReceipt(receipt: object): any {
    var newReceipt = new ReceiptModel(receipt);
    newReceipt.save();

    return newReceipt;
  }

  async countAll(): Promise<Number | 0> {
    return await ReceiptModel.countDocuments({});
  }
}
