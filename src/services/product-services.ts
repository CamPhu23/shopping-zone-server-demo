import { ResponseData } from '../data/models';
import { Product, ProductIntroduce } from '../models';
import {productRepository} from '../repositories';
import { ResultCode } from '../utils';

export class ProductService {
  async getAllProduct(category: string, color: string, size: string, feature: string, p: number, s: number): Promise<any> {
    console.log({category, color, size, feature, p, s});
    
    const queryCategory = category.split(",");
    const queryColor = color.split(",");
    const querySize = size.split(",");
    const queryFeature = feature.split(",");
    
    // console.warn({queryCategory, queryColor, querySize, queryFeature});

    const products = await productRepository.getAllProduct(queryCategory, queryColor, querySize, queryFeature, p, s);
    // const total = await productRepository.countTotalProduct(queryCategory, queryColor, querySize, queryFeature);
    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      // result: {
      //   products: products.map((product: Product): ProductIntroduce => {
      //     return Product.formatToIntroduce(product);
      //   }),
      //   info: {
      //     currentIndex: products.length ? (p-1) * s + 1 : 0,
      //     numberOfIndex: products.length,
      //     // total 
      //   }
      // }
      result: null
    };

    return result;
  }
}