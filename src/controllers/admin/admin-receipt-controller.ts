import express from "express";
import { ResponseData } from "../../data/models";
import { adminProductService, adminReceiptService } from "../../services";
import { ResultCode } from "../../utils";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../../utils/default-value";
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
    let res: ResponseData;
    try {
      const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = request.query;
    
      res = await adminReceiptService.getAllReceipts(page as string, size as string);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getReceipt(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id } = request.params;
      res = await adminReceiptService.getReceipt(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async postUpdateStaus(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      const receipt = request.body;
      res = await adminReceiptService.updateReceipStatus(receipt);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }
}

export default AdminReceiptController;