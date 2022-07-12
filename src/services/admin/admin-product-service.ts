import _ from "lodash";
import { ResponseData } from "../../data/models";
import { Image, Product, Warehouse } from "../../models";
import { Rating } from "../../models/rating-model";
import { imageRepository, productRepository } from "../../repositories";
import { ResultCode } from "../../utils";

export class AdminProductService {
  async getAllProducts(page: string, size: string): Promise<ResponseData> {
    let res: ResponseData;
    
    let s;
    if (size != "All") {
      s = parseInt(size);
    }
    else {      
      s = 100;
    }
    let p = parseInt(page);

    const products = await productRepository.getAllProducts(p, s);
    const numOfProduct = await productRepository.countAll();

    return (res = {
      status: ResultCode.SUCCESS,
      result: {
        products,
        info: {
          currentIndex: p,
          currentSize: s,
          total: numOfProduct,
        }
      }
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

  async updateProduct(product: any): Promise<ResponseData> {
    let res: ResponseData;

    // get deleted images
    let deletedImageIDs = product.deletedImages.map(({ id, ...image }: { id: any }) => id);
    let deletedImages = await imageRepository.findImages(deletedImageIDs);
    product.deletedImages = deletedImages;

    // delete image
    imageRepository.deleteImages(deletedImageIDs);

    // save new images and update product
    let newImages = await imageRepository.saveImages(product.images);
    product.images = newImages;
    let newProduct = await productRepository.updateProduct(product);
    imageRepository.updateProductInImage(newImages, newProduct);

    return (res = {
      status: ResultCode.SUCCESS
    })
  }

  async getProduct(id: string): Promise<any> {
    let product = await productRepository.getProduct(id);

    product.warehouses = Warehouse.formatProductDetailRes(product.warehouses);
    product.ratings = Rating.formatProductDetailRes(product.ratings);

    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: product
    };
    return result;
  }

  async deleteProduct(id: string): Promise<any> {

    imageRepository.deleteImagesByProductID(id);
    let product = await productRepository.deleteProduct(id);

    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: product
    };
    return result;
  }
}
