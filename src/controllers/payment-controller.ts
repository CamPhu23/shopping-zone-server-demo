import express from "express";
import { paymentService } from "../services";
import BaseController from "./base-controller";

class PaymentController extends BaseController {
  private path = "/payment";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}`, this.postPaymet);
  }

  private async postPaymet(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let token = request.headers.authorization?.split(" ")[1];
    const res = await paymentService.makeAPayment(request.body, token as string || "");
    
    super.responseJson(response, res);
  }
}

export default PaymentController;
