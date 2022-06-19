import _ from "lodash";
import { Product, ProductModel } from "../models";
import { BaseRepository } from "./base-repository";

export class ProductRepository extends BaseRepository {
  async getAllProducts(): Promise<any> {
    return await ProductModel
      .find({ isDelete: false }, "id name price discount category tags");
  }

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
  async getProduct(id: string): Promise<any> {
    let product = await ProductModel.findOne({ _id: id, isDelete: false })
      .populate("images", "_id name url publicId")
      .populate("warehouses", "_id size color quantity sold")
      .populate({
        path: "comments",
        select: "content name replyTo"
      })
      .populate({ path: "ratings", select: "rate" });

    return product ? Product.fromData(product) : null;
  }

  async saveProduct(product: Product): Promise<Product | any> {
    let newProduct = new ProductModel(product);
    await newProduct.save();

    return newProduct;
  }

  async countAll(): Promise<Number | 0> {
    return await ProductModel.countDocuments({});
  }

  async deleteProduct(id: string): Promise<Product | any> {
    let deletedProduct = await ProductModel.findByIdAndUpdate({ _id: id },
      { $set: { isDelete: true } }, { new: true }).exec();

    return Product.fromData(deletedProduct);
  }

  async updateProduct(product: any): Promise<Product | any> {
    let newProduct: any;

    // only push new images
    ProductModel.findOneAndUpdate(
      { _id: product.id },
      {
        name: product.name,
        description: product.description,
        price: product.price,
        discount: product.discount,
        tags: product.tags,
        category: product.category,
        $push: { images: product.images },
      },
      { new: true }, (err, product) => {
        console.log(err);
      }
    );

    // delete images (because push and pull 1 property => conflict)
    ProductModel.findOneAndUpdate(
      { _id: product.id },
      {
        $pullAll: { images: product.deletedImages }
      },
      { new: true }, (err, product) => {
        console.log(err);
        newProduct = product;
      }
    );

    return newProduct;
  }
}
