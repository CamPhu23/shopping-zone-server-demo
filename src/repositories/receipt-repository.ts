import _ from "lodash";
import { ReceiptModel, Receipt } from "../models";
import { BaseRepository } from "./base-repository";

export class ReceiptRepository extends BaseRepository {
  async getAllReceitUserId(id: string, page: number, size: number): Promise<Receipt[] | any> {
    return await ReceiptModel.find({ "client": id },
      "id createdAt paymentMethod totalBill status",
      { skip: (page - 1) * size, limit: size })
      .sort({ createdAt: -1 });
  }

  async getReceitById(id: string): Promise<Receipt | any> {
    return await ReceiptModel.findOne({ "_id": id })
      .populate({
        path: "ratings",
        select: 'product rate'
      });
  }

  async countAllReceiptById(id: string): Promise<number | any> {
    return await ReceiptModel.countDocuments({ "client": id });
  }

  async updateStatus(receipt: any): Promise<any> {
    let isUpdated: any = false;
    isUpdated = await ReceiptModel.findOneAndUpdate({ "_id": receipt.id },
      { "status": receipt.status }, { new: true, rawResult: true });

    return isUpdated.lastErrorObject.updatedExisting;
  }

  async getAllReceipts(page: number, size: number): Promise<any> {
    return await ReceiptModel
      .find({}, "id fullname phone email paymentMethod totalBill status",
        { skip: (page - 1) * size, limit: size })
        .sort({ createdAt: -1 });
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

  async updateProductRating(receipt: string, rating: string): Promise<any> {
    ReceiptModel.findOneAndUpdate(
      { _id: receipt },
      {
        $addToSet: { ratings: rating },
      },
      { new: true }, (err, receipt) => {
        console.log(err);
      }
    );
  }

  async countAll(): Promise<Number | 0> {
    return await ReceiptModel.countDocuments({});
  }

  async getReceiptByMonthAndYear(): Promise<any> {
    return await ReceiptModel.aggregate([
      {
        $group: {
          _id: { $substr: ['$createdAt', 5, 2] },
          numberofreceipts: { $sum: 1 }
        }
      }
    ]);
  }
}
