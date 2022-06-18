import { ResponseData } from "../../data/models";
import { Product } from "../../models";
import { imageRepository, productRepository } from "../../repositories";
import { ResultCode } from "../../utils";

export class AdminProductService {
  async getAllProducts(): Promise<ResponseData> {
    let res: ResponseData;
    const result = await productRepository.getAllProducts();

    return (res = {
      status: ResultCode.SUCCESS,
      result
    })
  }

  async createProduct(product: Product): Promise<ResponseData> {
    let res: ResponseData;

    let newImages = await imageRepository.saveImages(product.images);
    product.images = newImages;
    let newProduct = await productRepository.saveProduct(product);
    imageRepository.updateProductInImage(newImages, newProduct);

    return (res = {
      status: ResultCode.SUCCESS
    })
  }
}
