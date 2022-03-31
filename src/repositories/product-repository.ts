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
  ): Promise<Product[]> {
    const products = await ProductModel.find({
      category: { $in: category },
      tags: { $in: feature },
      warehouses: { $elemMatch: {$exists: true }}
    })
      .populate("images", "_id name url publicId")
      .populate({
        path: "warehouses",
        match: {
          size: { $in: size },
          color: { $in: color },
        },
        select: "size color quantity sold",
      });
    // .skip((p - 1) * s);

    return super.parseData(products, Product);
  }

  // async countTotalProduct(
  //   category: string[],
  //   color: string[],
  //   size: string[],
  //   feature: string[]
  // ): Promise<number> {
  //   const total = await ProductModel.find({
  //     category: { $in: category },
  //     color: { $in: color },
  //     size: { $in: size },
  //     feature: { $in: feature },
  //   }).count();

  //   return total || 0;
  // }
}
