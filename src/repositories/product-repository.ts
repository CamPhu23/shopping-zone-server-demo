import _ from "lodash";
import { Product, ProductModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ProductRepository extends BaseRepository {
  async getAllProduct(
    category: string[],
    color: string[],
    size: string[],
    feature: string[],
    search: string,
    p: number,
    s: number
  ): Promise<any> {
    let rawData;
    
    if (!_.isEmpty(search)) {
      rawData = await ProductModel.find({
        category: { $in: category },
        tags: { $in: feature },
        isDelete: false,
        name: { $regex: search }
      })
        .populate("images", "_id name url publicId")
        .populate("ratings")
        .populate({
          path: "warehouses",
          match: {
            size: { $in: size },
            color: { $in: color },
            quantity: { $gt: 0 }
          },
          select: "size color quantity sold",
        });
    } else {
      rawData = await ProductModel.find({
        category: { $in: category },
        tags: { $in: feature },
        isDelete: false,
      })
        .populate("images", "_id name url publicId")
        .populate("ratings")
        .populate({
          path: "warehouses",
          match: {
            size: { $in: size },
            color: { $in: color },
            quantity: { $gt: 0 },
          },
          select: "size color quantity sold",
        });
    }

    const data = rawData.filter((p: any): any => p.warehouses.length > 0);
    const productList = data.slice((p - 1) * s, p * s);

    return {
      products: super.parseData(productList, Product),
      total: data.length
    };
  }

  // Get product by id
  async getProduct(id: string): Promise<any>{
    let product = await ProductModel.findOne({ _id: id })
                                      .populate("images", "_id name url publicId")
                                      .populate("warehouses", "_id size color quantity sold")
                                      .populate({ path: "comments", 
                                                  select: "content name replyTo"})
                                      .populate({path:"ratings", select: "rate"});

    return product? Product.fromData(product): null;
  }
}
