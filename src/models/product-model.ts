import { Schema, model, Types } from "mongoose";
import { BaseModel } from "./base-model";

interface IProduct {
  name: string,
  description: string,
  price: number,
  visible: boolean,
  isDelete: boolean,
  // productType: Types.ObjectId
}


export class Product {
  id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  visible: boolean;
  isDelete: boolean;

  static fromData(data: any): Product {
    const product = new Product();

    product.id = data.id;
    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.visible = data.visible;
    product.isDelete = data.isDelete;

    return product;
  }
};


const schema = new Schema<IProduct>({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  visible: {
    type: Boolean,
    default: true
  },

  isDelete: {
    type: Boolean,
    default: false
  },

  // productType: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'ProductType'
  // }
});

export const ProductModel = model<IProduct>('Product', schema);