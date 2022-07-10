import BaseController from "./base-controller";
import { ResultCode, DefaultValue } from "../utils";
import express from "express";
import { ResponseData } from "../data/models";
import { productService } from "../services";
import { Product } from "../models";

class ProductController extends BaseController {
  private path = "/products";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/`, this.getAllProduct);
    this.router.get(`${this.path}/:id`, this.getProduct);
  }

  // http://localhost:8000/product?category=ao-thun&color=do&size=S&feature=hang-moi-ve&p=1&s=10
  private async getAllProduct(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      const {
        category = DefaultValue.DEFAULT_PRODUCT_CATEGORY,
        color = DefaultValue.DEFAULT_PRODUCT_COLOR,
        size = DefaultValue.DEFAULT_PRODUCT_SIZE,
        feature = DefaultValue.DEFAULT_PRODUCT_FEATURE,
        search = DefaultValue.DEFAULT_PRODUCT_SEARCH,
        sort = DefaultValue.DEFAULT_PRODUCT_SORT,
        p = DefaultValue.DEFAULT_PAGE,
        s = DefaultValue.DEFAULT_SIZE,
      } = request.query;
  
      res = await productService.getAllProduct(
        category.toString(),
        color.toString(),
        size.toString(),
        feature.toString(),
        search.toString(),
        sort.toString(),
        parseInt(p.toString()),
        parseInt(s.toString())
      );
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }    
    }  

    super.responseJson(response, res);
  }

  private async getProduct(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any>{
    let res: ResponseData;
    try {
      const {id} = request.params;
      res = await productService.getProduct(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }
}

export default ProductController;
