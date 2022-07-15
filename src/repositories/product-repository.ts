import _ from "lodash";
import { Product, ProductModel, Comment } from "../models";
import { BaseRepository } from "./base-repository";
const mongoose = require('mongoose');

export class ProductRepository extends BaseRepository {
  async getAllProducts(page: number, size: number): Promise<any> {
    return await ProductModel
      .find({ isDelete: false }, "id name price discount category tags",
        { skip: (page - 1) * size, limit: size })
      .sort({ createdAt: -1 });
  }

  async getAllProduct(
    category: string[],
    color: string[],
    size: string[],
    feature: string[],
    search: string,
    sort: string,
    p: number,
    s: number
  ): Promise<any> {
    let rawData;
    
    let sortBy = sort.split("_")[0];
    let sortDirection = sort.split("_")[1];

    if (!_.isEmpty(search)) {
      if (feature.length === 3) {
        rawData = await ProductModel.find({
          category: { $in: category },
          isDelete: false,
          name: { $regex: new RegExp(search, "i") }
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
          name: { $regex: new RegExp(search, "i") }
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
      }
    } else if (_.isEmpty(search) && feature.length !== 3) {
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
    } else {
      rawData = await ProductModel.find({
        category: { $in: category },
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

    switch (sortBy) {
      case ("price"):
        if (sortDirection == "asc") {
          rawData = rawData.sort((a, b) => a.price - b.price);
        }
        else {
          rawData = rawData.sort((a, b) => b.price - a.price);
        }
        break;
      default:
        if (sortDirection == "asc") {
          rawData = rawData.sort((a, b) => a.name.localeCompare(b.name));
        }
        else {
          rawData = rawData.sort((a, b) => b.name.localeCompare(a.name));
        }
        break;
    }

    switch (sortBy) {
      case ("price"):
        if (sortDirection == "asc") {
          rawData = rawData.sort((a, b) => a.price - b.price);
        }
        else {
          rawData = rawData.sort((a, b) => b.price - a.price);
        }
        break;
      default:
        if (sortDirection == "asc") {
          rawData = rawData.sort((a, b) => a.name.localeCompare(b.name));
        }
        else {
          rawData = rawData.sort((a, b) => b.name.localeCompare(a.name));
        }
        break;
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
        select: "content name replyTo updatedAt"
      })
      .populate({ path: "ratings", select: "rate" });

    return product ? Product.fromData(product) : null;
  }

  // Get product by name
  async getProductByName(name: string): Promise<any> {
    let product = await ProductModel.findOne({ "name": name, isDelete: false }, "_id");

    return product;
  }

  async saveProduct(product: Product): Promise<Product | any> {
    let newProduct = new ProductModel(product);
    await newProduct.save();

    return newProduct;
  }

  async countAll(): Promise<Number | 0> {
    return await ProductModel.countDocuments({ isDelete: false });
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

  async saveReply(productID: string, comment: Comment | null): Promise<any> {
    if (!_.isNull(comment)) {
      let id = mongoose.Types.ObjectId(productID);

      await ProductModel.findByIdAndUpdate(id, { $push: { comments: comment.id } })
    }
  }

  async deleteComments(ids: string[], productId: string): Promise<any> {
    ProductModel.findByIdAndUpdate({ "_id": productId }, { $pull: { comments: { $in: ids } } },
      (err, product) => { console.log(err); })
  }

  async getProductByMonthAndYear(): Promise<any> {
    return await ProductModel.aggregate([
      {
        $match: {
          "isDelete": {
            $eq: false,
          },
        }
      },
      {
        $group: {
          _id: { $substr: ['$createdAt', 5, 2] },
          numberofproducts: { $sum: 1 }
        }
      }
    ]);
  }

  async updateWarehouse(productId: string, warehouseId: string): Promise<any> {
    ProductModel.findOneAndUpdate({ "_id": productId },
      { $addToSet: { warehouses: warehouseId } },
      { new: true }, (err, product) => { console.log(err) });
  }
  
  async updateProductRating(product: string, rating: string): Promise<any> {
    ProductModel.findOneAndUpdate(
      { _id: product },
      {
        $addToSet: { ratings: rating },
      },
      { new: true }, (err, product) => {
        console.log(err);
      }
    );
  }
}
