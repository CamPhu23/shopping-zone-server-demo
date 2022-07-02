import express from "express";
import { adminProductService, adminReceiptService } from "../../services";
import BaseController from "../base-controller";

class AdminReceiptController extends BaseController {
  private path = "/admin/receipts";

  constructor() {
    super();
    this.initializeRouters();
  }
  protected initializeRouters(): void {
    this.router.get(`${this.path}/`, this.getAllReceipts);
    this.router.get(`${this.path}/:id`, this.getReceipt);
    this.router.post(`${this.path}/update-status`, this.postUpdateStaus);
  }

  private async getAllReceipts(
    request: express.Request,
    response: express.Response): Promise<any> {

    const res = await adminReceiptService.getAllReceipts();

    super.responseJson(response, res);
  }

  private async getReceipt(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any>{
    const {id} = request.params;

    const res = await adminReceiptService.getReceipt(id);
    super.responseJson(response, res);
  }

  private async postUpdateStaus(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any>{
    const receipt = request.body;

    const res = await adminReceiptService.updateReceipStatus(receipt);
    super.responseJson(response, res);
  }
}

export default AdminReceiptController;