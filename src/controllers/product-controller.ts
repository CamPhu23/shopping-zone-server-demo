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
    const authenticateToken = request.headers.authorization 
      ? request.headers.authorization.split(' ')[1]
      : null;
      
    const mockJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0ODEwNTQ2NCwiZXhwIjoxNjQ4MTA5MDY0fQ.qWFnJgrWYUY90_8V6osSvuV0qRNhV4SenMVM_KP_Z0s';
    
    let res: ResponseData;
    if (!authenticateToken || authenticateToken != mockJWT) {
      res = {
        status: ResultCode.NOT_AUTHORIZE,
        message: "Token not match"
      };
    }
    else {
      res = await productService.getAllProduct();
    }

    super.responseJson(response, res);
  }
}

export default ProductController;