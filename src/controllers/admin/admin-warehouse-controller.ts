import express from "express";
import { result } from "lodash";
import { ResponseData } from "../../data/models";
import { adminWarehouseService } from '../../services';
import { ResultCode } from "../../utils";
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
    let res: ResponseData;
    try {
      const product = request.body;
      res = await adminWarehouseService.importProduct(product);     
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }
    
    super.responseJson(response, res);
  }
}

export default AdminWarehouseController;