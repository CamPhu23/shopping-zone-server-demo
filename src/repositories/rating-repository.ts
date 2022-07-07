import _ from "lodash";
import { ReceiptModel, Receipt } from "../models";
import { RatingModel } from "../models/rating-model";
import { BaseRepository } from "./base-repository";

export class RatingRepository extends BaseRepository {
  async ratingProduct(product: string, rate: number, receipt: string): Promise<any> {
    return await RatingModel.findOneAndUpdate({
      "product": { _id: product },
      "receipt": { _id: receipt },
    },
      { "rate": rate },
      { upsert: true, new: true });
  }

}
