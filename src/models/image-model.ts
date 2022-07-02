import { Schema, model, Types } from "mongoose";
import { Product } from "./product-model";

interface IImage {
  name: string;
  url: string;
  format: string;
  height: number;
  width: number;
  size: number;
  isDelete: boolean;
  product: Types.ObjectId;
}

export interface ImageWithoutProduct {
  id: string;
  name: string;
  url: string;
}

export class Image {
  id: string;
  name: string;
  url: string;
  format: string;
  height: number;
  width: number;
  size: number;
  isDelete: boolean;
  product?: Product | null;

  static fromData(data: any): Image {
    const image = new Image();

    image.id = data.id as string;
    image.name = data.name;
    image.url = data.url;
    image.format = data.format;
    image.height = data.height;
    image.width = data.width;
    image.size = data.size;
    image.isDelete = data.isDelete;
    image.product = data.product ? Product.fromData(data.product) : null;

    return image;
  }

  static getImageWithoutProduct(image: Image): ImageWithoutProduct {
    return {
      id: image.id,
      name: image.name,
      url: image.url
    };
  }
}

const schema = new Schema<IImage>({
  name: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  format: {
    type: String,
    required: false,
  },

  height: {
    type: Number,
    required: false,
  },

  width: {
    type: Number,
    required: false,
  },

  size: {
    type: Number,
    required: false,
  },

  isDelete: {
    type: Boolean,
    required: false,
    default: false
  },

  product: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "products",
  },
});

export const ImageModel = model<IImage>("images", schema);
