import express from "express";
import { ResponseData } from "../data/models";
import { paymentService } from "../services";
import { ResultCode } from "../utils";
import BaseController from "./base-controller";

class PaymentController extends BaseController {
  private path = "/payment";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}`, this.postPayment);
  }

  private async postPayment(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      let token = request.headers.authorization?.split(" ")[1];
      res = await paymentService.makeAPayment(request.body, token as string || "");
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    } 

    super.responseJson(response, res);
  }
}

export default PaymentController;
