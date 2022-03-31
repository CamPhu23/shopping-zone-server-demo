import { Product, ProductModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ProductRepository extends BaseRepository {
  async getAllProduct(
    category: string[],
    color: string[],
    size: string[],
    feature: string[],
    p: number,
    s: number
  ): Promise<any> {
    const rawData = await ProductModel.find({
      category: { $in: category },
      tags: { $in: feature },
      isDelete: false
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

    const data = rawData.filter((p: any): any => p.warehouses.length > 0);
    const productList = data.slice((p - 1) * s, p * s);

    return {
      products: super.parseData(productList, Product),
      total: data.length
    };
  }
}
