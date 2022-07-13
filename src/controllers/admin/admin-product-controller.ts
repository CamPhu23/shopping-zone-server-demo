import express from "express";
import { adminProductService } from "../../services";
import BaseController from "../base-controller";
import { ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../../utils/default-value";

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
    let res: ResponseData;
    try {
      const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = request.query;

      res = await adminProductService.getAllProducts(page as string, size as string);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async createProduct(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      const product = request.body;
      res = await adminProductService.createProduct(product);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async updateProduct(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      const product = request.body;
      res = await adminProductService.updateProduct(product);
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
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id } = request.params;
      res = await adminProductService.getProduct(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async deleteProduct(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id } = request.params;
      res = await adminProductService.deleteProduct(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }
}

export default AdminProductController;