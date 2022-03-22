import { ResponseData } from '../data/models';
import {productRepository} from '../repositories';
import { ResultCode } from '../utils';

export class ProductService {
  async getAllProduct(): Promise<any> {
    const products = await productRepository.getAllProduct();
    const result: ResponseData = {
      status: ResultCode.SUCCESS,
      result: products
    };

    return result;
  }
}