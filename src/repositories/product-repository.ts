import {Product, ProductModel} from '../models'
import { BaseRepository } from './base-repository';

export class ProductRepository extends BaseRepository {
  async getAllProduct(): Promise<Product[]> {
    const products = await ProductModel.find();
    return super.parseData(products, Product);
  }
}