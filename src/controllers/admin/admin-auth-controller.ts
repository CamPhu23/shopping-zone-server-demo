import express from "express";
import { ResponseData } from "../../data/models";
import { adminAuthService } from '../../services';
import { ResultCode } from "../../utils";
import BaseController from "../base-controller";

class AdminAuthenticationController extends BaseController {
  private path = "/admin/auth";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/refresh-token`, this.refreshToken);
  }

  private async login(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { username, password } = request.body;

      res = await adminAuthService.login(username, password);
    }
    catch (e) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async refreshToken(
    request: express.Request,
    response: express.Response): Promise<any> {
    const { token } = request.body;
    const res = await adminAuthService.refreshToken(token);
    super.responseJson(response, res);
  }
}

export default AdminAuthenticationController;