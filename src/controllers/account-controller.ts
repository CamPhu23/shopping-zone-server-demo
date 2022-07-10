import express from "express";
import { ResponseData } from "../data/models";
import { accountService } from '../services';
import { ResultCode } from "../utils";
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
    this.router.post(`${this.path}/rating`, this.postRating);
  }

  private async postRating(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const data = request.body;
      res = await accountService.ratingProduct(data);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async updateInforUserById(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id, fullname, email, phone, address } = request.body;
      res = await accountService.updateInforUserById(id, fullname, email, phone, address);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getReceiptById(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id } = request.params;
      res = await accountService.getReceiptById(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getAllReceiptByUser(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id = "", page = DEFAULT_PAGE, size = DEFAULT_SIZE } = request.query;
      res = await accountService.getAllReceiptByUserId(id as string, page as string, size as string);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getInforUser(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      let token = request.headers.authorization?.split(" ")[1];
      res = await accountService.getInforUser(token as string || "");
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }
}

export default AccountController;