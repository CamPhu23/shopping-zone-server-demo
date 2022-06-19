import { Image, ImageModel, Product } from "../models";
import { BaseRepository } from "./base-repository";

export class ImageRepository extends BaseRepository {
  async saveImages(images: Image[]): Promise<Image[] | []> {
    let newImagesList: any[] = [];

    for await (var image of images) {
      let newImage = new ImageModel(image);
      await newImage.save();

      newImagesList.push(newImage);
    }

    return newImagesList;
  };

  updateProductInImage(images: Image[], product: Product): void {
    ImageModel.updateMany({ _id: { $in: images } }, { product: product }, (err: any) => { })
  }

  async findImages(imageIDs: string[]): Promise<Image[] | []> {
    return ImageModel.find({ "_id": { $in: imageIDs } });
  };

  deleteImages(ids: string[]): void {
    ImageModel.deleteMany({ _id: { $in: ids } });
  }

  deleteImagesByProductID(productID: string): void {
    ImageModel.deleteMany({ "product": { _id: productID } });
  }
}