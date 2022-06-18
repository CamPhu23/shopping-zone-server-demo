import express from "express";
import { adminProductService } from "../../services";
import BaseController from "../base-controller";

class AdminProductController extends BaseController {
  private path = "/admin/products";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/`, this.getAllProducts);
    this.router.post(`${this.path}/create`, this.createProduct);
  }

  private async getAllProducts(
    request: express.Request,
    response: express.Response): Promise<any> {

    const res = await adminProductService.getAllProducts();
    console.log(res);

    super.responseJson(response, res);
  }

  private async createProduct(
    request: express.Request,
    response: express.Response): Promise<any> {

    const product = request.body;
    
    const res = await adminProductService.createProduct(product);

    super.responseJson(response, res);
  }
}

export default AdminProductController;