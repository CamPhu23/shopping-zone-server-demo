import BaseController from "./base-controller";
import express from "express";
import { authService } from '../services';
import jwt from "jsonwebtoken"; //Huy import 

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
    // Forgot password router
    this.router.post(`${this.path}/forgotpassword`, this.forgotPassword)
    // Reset password router
    this.router.post(`${this.path}/resetpassword/:token`, this.resetPassword)
    
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
  // Forgot Password function
  private async forgotPassword(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {email} = request.body;
    console.log({email})

    const res = await authService.forgotPassword(email);
    super.responseJson(response, res);
  }

  // Reset password 
  private async resetPassword(
    request: express.Request,
    response: express.Response
  ): Promise<any> {

    const {newPassword, re_enterPassword} = request.body
    // Get token of link
    const {token} = request.params
    // decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_RESET_PASSWORD_TOKEN_SECRET_KEY as string)
    
    // create interface to cast the data type of email to string
    interface JWTData {
      email: string;
    }
    console.log((decodedToken as JWTData).email)
    const email = (decodedToken as JWTData).email
    console.log({newPassword, re_enterPassword})
    const res = await authService.resetPassword(email, newPassword)
    super.responseJson(response, res);
    console.log('Change password successfully')
  }
}

export default AuthenticationController;