import BaseController from "./base-controller";
import express from "express";
import { authService } from '../services';

class AuthenticationController extends BaseController {
  private path = "/auth";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/refresh-token`, this.refreshToken);
  }

  private async login(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {username, password} = request.body;
    console.log({username, password});
    
    const res = await authService.login(username, password);
    super.responseJson(response, res);
  }

  private async register(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {email, username, password} = request.body;
    console.log({email, username, password});
    
    const res = await authService.register(email, username, password);
    super.responseJson(response, res);
  }

  private async refreshToken(
    request: express.Request,
    response: express.Response): Promise<any> {
      const { token } = request.body;
      const res = await authService.refreshToken(token);
      super.responseJson(response, res);
  }
}

export default AuthenticationController;