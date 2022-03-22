import BaseController from "./base-controller";
import { ResultCode } from '../utils';
import express from "express";
import { ResponseData } from "../data/models";
import { productService } from "../services";

class ProductController extends BaseController {
  private path = '/product';

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/`, this.getAllProduct);
  }

  protected initializeServices(): void {

  }

  private async getAllProduct(request: express.Request, response: express.Response, next: express.NextFunction): Promise<any> {
    // const res: ResponseData = {
    //   status: ResultCode.SUCCESS,
    //   result: {
    //     mess: "oke"
    //   }
    // };

    const res = await productService.getAllProduct();

    super.responseJson(response, res);
  }
}

export default ProductController;