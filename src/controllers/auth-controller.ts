import BaseController from "./base-controller";
import express from "express";
import { ResponseData } from "../data/models";
import { ResultCode } from "../utils";

class AuthenticationController extends BaseController {
  private path = "/auth";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/register`, this.register);
  }

  protected initializeServices(): void {
    throw new Error("Method not implemented.");
  }

  private async login(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const {email, password} = request.body;
    console.log({email, password});
    
    const mockJWT =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY0ODEwNTQ2NCwiZXhwIjoxNjQ4MTA5MDY0fQ.qWFnJgrWYUY90_8V6osSvuV0qRNhV4SenMVM_KP_Z0s";
    const res: ResponseData = {
      status: ResultCode.SUCCESS,
      result: {
        token: mockJWT,
      },
    };

    super.responseJson(response, res);
  }

  private async register(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default AuthenticationController;