import { Schema, model, Types } from "mongoose";
import { Image, Warehouse } from ".";

interface IProduct {
  name: string;
  description: string;
  price: number;
  isDelete: boolean;
  discount: number;
  category: string;
  tags: string[];
  images: Types.ObjectId;
  warehouses: Types.ObjectId;
}

export interface ProductIntroduce {
  id: string;
  name: string;
  category: string;
  price: number;
  image: Image | undefined;
}

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  tags: string[];
  images: Image[] | null;
  warehouses: Warehouse[] | null;
  isDelete: boolean;

  static fromData(data: any): Product {
    const product = new Product();

    product.id = data.id as string;
    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.discount = data.discount;
    product.category = data.category;
    product.tags = data.tags;

    product.images = data.images
      ? data.images.map((image: any): Image => {
          return Image.fromData(image);
        })
      : null;

    product.warehouses = data.warehouses
      ? data.warehouses.map((warehouse: any): Warehouse => {
        return Warehouse.fromData(warehouse);
      })
      : null;

    product.isDelete = data.isDelete;

    return product;
  }

  static formatToIntroduce(product: Product): ProductIntroduce {
    return {
      id: product.id,
      category: product.category,
      name: product.name,
      price: product.price,
      image: product.images?.at(0),
    };
  }
}

const schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  isDelete: {
    type: Boolean,
    default: false,
  },

  discount: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  tags: [
    {
      type: String,
      required: false,
    }
  ],

  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "images",
      required: true,
    },
  ],

  warehouses: [
    {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
      required: false,
    }
  ],
});

export const ProductModel = model<IProduct>("products", schema);
