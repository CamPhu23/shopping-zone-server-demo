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
    this.router.get(`${this.path}/:id`, this.getProduct);
    this.router.post(`${this.path}/create`, this.createProduct);
    this.router.get(`${this.path}/delete/:id`, this.deleteProduct);
    this.router.post(`${this.path}/update`, this.updateProduct);
  }

  private async getAllProducts(
    request: express.Request,
    response: express.Response): Promise<any> {

    const res = await adminProductService.getAllProducts();

    super.responseJson(response, res);
  }

  private async createProduct(
    request: express.Request,
    response: express.Response): Promise<any> {

    const product = request.body;
    
    const res = await adminProductService.createProduct(product);

    super.responseJson(response, res);
  }

  private async updateProduct(
    request: express.Request,
    response: express.Response): Promise<any> {

    const product = request.body;
    const res = await adminProductService.updateProduct(product);

    super.responseJson(response, res);
  }

  private async getProduct(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any>{
    const {id} = request.params;

    const res = await adminProductService.getProduct(id);
    super.responseJson(response, res);
  }

  private async deleteProduct(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any>{
    const {id} = request.params;

    const res = await adminProductService.deleteProduct(id);
    super.responseJson(response, res);
  }
}

export default AdminProductController;