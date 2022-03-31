import { Schema, model, Types } from "mongoose";
import { Product } from "./product-model";

interface IImage {
  name: string;
  url: string;
  publicId: string;
  product: Types.ObjectId;
}

export class Image {
  id: string;
  name: string;
  url: string;
  publicId: string;
  product: Product | null;

  static fromData(data: any): Image {
    const image = new Image();

    image.id = data.id as string;
    image.name = data.name;
    image.url = data.url;
    image.publicId = data.publicId;
    image.product = data.product ? Product.fromData(data.product) : null;

    return image;
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

  publicId: {
    type: String,
    required: true,
  },

  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
});

export const ImageModel = model<IImage>("images", schema);
