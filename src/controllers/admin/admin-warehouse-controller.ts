import express from "express";
import { adminWarehouseService } from '../../services';
import BaseController from "../base-controller";

class AdminWarehouseController extends BaseController {
  private path = "/admin/warehouse";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/import`, this.importProduct);
  }

  private async importProduct(
    request: express.Request,
    response: express.Response): Promise<any> {

    const product = request.body;

    const res = await adminWarehouseService.importProduct(product);

    super.responseJson(response, res);
  }
}

export default AdminWarehouseController;