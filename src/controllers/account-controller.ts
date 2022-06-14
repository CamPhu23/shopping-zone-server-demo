import express from "express";
import { accountService } from '../services';
import BaseController from "./base-controller";
import { ResultCode } from "../utils";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { ResponseData } from "../data/models";


class AccountController extends BaseController {
  private path = "/account";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/update-infor-user`, this.updateInforUserById);
    this.router.post(`${this.path}/infor`, this.getInforUser);

  }

  private async updateInforUserById(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {id, fullname, email, phone, address} = request.body;
    
    const res = await accountService.updateInforUserById(id, fullname, email, phone, address);
    super.responseJson(response, res);
  }
  
  private async getInforUser(
    request: express.Request,
    response: express.Response
  ): Promise<any>{
    let token = request.headers.authorization?.split(" ")[1];
    // console.log('token: ', token)
    const res = await accountService.getInforUser(token as string || "");
    
    super.responseJson(response, res);

  }
}

export default AccountController;