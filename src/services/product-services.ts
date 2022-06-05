import _ from 'lodash';
import { ResponseData } from '../data/models';
import { Product, ProductIntroduce, Warehouse } from '../models';
import { Rating } from '../models/rating-model';
import { productRepository } from '../repositories';
import { ResultCode } from '../utils';

export class ProductService {
  async getAllProduct(category: string, color: string, size: string, feature: string, search: string, p: number, s: number): Promise<any> {
    console.log({ category, color, size, feature, p, s });

    const queryCategory = category.split(",");
    const queryColor = color.split(",");
    const querySize = size.split(",");
    const queryFeature = feature.split(",");

    const queryData = await productRepository.getAllProduct(queryCategory, queryColor, querySize, queryFeature, search, p, s);
    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: {
        products: queryData.products.map((product: Product): ProductIntroduce => {
          return Product.formatToIntroduce(product);
        }),
        info: {
          currentIndex: queryData.products.length ? (p - 1) * s + 1 : 0,
          numberOfIndex: queryData.products.length,
          total: queryData.total
        }
      }
    };

    return result;
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
}