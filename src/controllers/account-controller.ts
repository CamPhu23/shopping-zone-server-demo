import express from "express";
import { accountService } from '../services';
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../utils/default-value";
import BaseController from "./base-controller";

class AccountController extends BaseController {
  private path = "/account";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/update`, this.updateInforUserById);
    this.router.get(`${this.path}/info`, this.getInforUser);
    this.router.get(`${this.path}/orders`, this.getAllReceiptByUser);
    this.router.get(`${this.path}/order/:id`, this.getReceiptById);
  }

  private async updateInforUserById(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const { id, fullname, email, phone, address } = request.body;

    const res = await accountService.updateInforUserById(id, fullname, email, phone, address);
    super.responseJson(response, res);
  }

  private async getReceiptById(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const { id } = request.params;

    const res = await accountService.getReceiptById(id);
    super.responseJson(response, res);
  }

  private async getAllReceiptByUser(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const { id = "", page = DEFAULT_PAGE, size = DEFAULT_SIZE } = request.query;

    const res = await accountService.getAllReceiptByUserId(id as string, page as string, size as string);
    super.responseJson(response, res);
  }

  private async getInforUser(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let token = request.headers.authorization?.split(" ")[1];
    // console.log('token: ', token)
    const res = await accountService.getInforUser(token as string || "");

    super.responseJson(response, res);
  }
}

export default AccountController;