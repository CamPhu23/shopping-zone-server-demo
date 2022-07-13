import BaseController from "./base-controller";
import express from "express";
import { ResponseData } from "../data/models";
import { authService } from '../services';
import jwt from "jsonwebtoken";
import { ResultCode } from "../utils";
import _ from 'lodash';

class AuthenticationController extends BaseController {
  private path = "/auth";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/google-login`, this.googleLogin);
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/refresh-token`, this.refreshToken);
    // Forgot password router
    this.router.post(`${this.path}/forgot-password`, this.forgotPassword)
    // Reset password router
    this.router.post(`${this.path}/reset-password/:token`, this.resetPassword)
  }

  private async login(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const {username, password} = request.body;
      res = await authService.login(username, password);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async googleLogin(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const {email, fullname} = request.body;
      
      res = await authService.googleLogin(email, fullname);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async register(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { email, username, password } = request.body;
      res = await authService.register(email, username, password);  
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async refreshToken(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      const { token } = request.body;
      res = await authService.refreshToken(token);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  // Forgot Password function
  private async forgotPassword(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { email } = request.body;

      res = await authService.forgotPassword(email);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  // Reset password 
  private async resetPassword(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { newPassword } = request.body;
      // Get token of link
      const { token } = request.params;
      // create interface to cast the data type of email to string
      interface JWTData {
        email: string;
      }
      let email = '';
      let error = '';
      // decode the token
      jwt.verify(token, process.env.JWT_RESET_PASSWORD_TOKEN_SECRET_KEY as string,
        async function (err, decodedToken) {
          if (err) {
            error = err.name;
          }
          if (!err) {
            email = (decodedToken as JWTData).email;
          }
        });
      // 
      if (!_.isEmpty(error)) {
        return super.responseJson(response, {
          status: ResultCode.GONE,
          message: "jwt expired",
        })
      };

      res = await authService.resetPassword(email, newPassword);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }
    
    super.responseJson(response, res);
  }
}

export default AuthenticationController;