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
    ImageModel.updateMany({ id: {$in: images} }, { product }, (err: any) => {})
  }
}