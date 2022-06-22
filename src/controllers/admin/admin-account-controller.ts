import express from "express";
import { adminAccountService } from '../../services';
import BaseController from "../base-controller";

class AdminAccountController extends BaseController {
  private path = "/admin/account";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/info`, this.getInfo);
  }

  private async getInfo(
    request: express.Request,
    response: express.Response): Promise<any> {
    let token = request.headers.authorization?.split(" ")[1];
    const res = await adminAccountService.getUsernameByToken(token || "");

    super.responseJson(response, res);
  }
}

export default AdminAccountController;