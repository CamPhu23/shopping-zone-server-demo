import BaseController from "./base-controller";
import { ResultCode, DefaultValue } from "../utils";
import express from "express";
import { ResponseData } from "../data/models";
import { productService } from "../services";

class ProductController extends BaseController {
  private path = "/products";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/`, this.getAllProduct);
  }

  // http://localhost:3000/product?category=ao-thun&color=do&size=S&feature=hang-moi-ve&p=1&s=10
  private async getAllProduct(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    // const res: ResponseData = {
    //   status: ResultCode.SUCCESS,
    //   result: {
    //     mess: "oke",
    //   },
    // };

    const {
      category = DefaultValue.DEFAULT_PRODUCT_CATEGORY,
      color = DefaultValue.DEFAULT_PRODUCT_COLOR,
      size = DefaultValue.DEFAULT_PRODUCT_SIZE,
      feature = DefaultValue.DEFAULT_PRODUCT_FEATURE,
      search = "",
      p = DefaultValue.DEFAULT_PAGE,
      s = DefaultValue.DEFAULT_SIZE,
    } = request.query;

    const res = await productService.getAllProduct(
      category.toString(),
      color.toString(),
      size.toString(),
      feature.toString(),
      search.toString(),
      parseInt(p.toString()),
      parseInt(s.toString())
    );

    super.responseJson(response, res);
  }
}

export default ProductController;
