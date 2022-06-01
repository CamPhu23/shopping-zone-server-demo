import { Product, ProductModel, Warehouse } from "../models";
import { BaseRepository } from "./base-repository";
import _, { forEach } from "lodash";
import { userInfo } from "os";
import { ObjectId } from "mongoose";

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
    console.log(category);
    
    if (!_.isEmpty(search)) {
      
      rawData = await ProductModel.find({
        category: { $in: category },
        tags: { $in: feature },
        isDelete: false,
        name: {$regex : search}
      })
        .populate("images", "_id name url publicId")
        .populate({
          path: "warehouses",
          match: {
            size: { $in: size },
            color: { $in: color },
            $where: "this.quantity > this.sold",
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
        .populate({
          path: "warehouses",
          match: {
            size: { $in: size },
            color: { $in: color },
            $where: "this.quantity > this.sold",
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

  // Get 1 product from mongodb
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
