import express from "express";
import { accountService } from '../services';
import BaseController from "./base-controller";

class AccountController extends BaseController {
  private path = "/account";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/`, this.updateInforUserById);

  }

  private async updateInforUserById(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {id, fullname, email, phone, address} = request.body;
    
    const res = await accountService.updateInforUserById(id, fullname, email, phone, address);
    super.responseJson(response, res);
  }

}

export default AccountController;