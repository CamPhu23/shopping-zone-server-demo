import express from "express";
import { ResponseData } from "../../data/models";
import { adminAccountService } from '../../services';
import { ResultCode } from "../../utils";
import BaseController from "../base-controller";

class AdminAccountController extends BaseController {
  private path = "/admin/account";
  private pathClient = "/admin/clients"

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/info`, this.getAdminInfo);
    this.router.get(`${this.pathClient}`, this.getAllClients);
    this.router.post(`${this.pathClient}/create`, this.createClient);
    this.router.get(`${this.pathClient}/:id`, this.getClient);
    this.router.get(`${this.pathClient}/delete/:id`, this.deleteClient);
    this.router.post(`${this.pathClient}/update`, this.updateClient);
  }

  private async createClient(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      const account = request.body;
      res = await adminAccountService.createClient(account);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getAdminInfo(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      let token = request.headers.authorization?.split(" ")[1];
      res = await adminAccountService.getUsernameByToken(token || "");
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getAllClients(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      res = await adminAccountService.getAllClients();
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async getClient(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id } = request.params;
      res = await adminAccountService.getClient(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }  

    super.responseJson(response, res);
  }

  private async deleteClient(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { id } = request.params;
      res = await adminAccountService.deleteClient(id);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }  

    super.responseJson(response, res);
  }

  private async updateClient(
    request: express.Request,
    response: express.Response): Promise<any> {
    let res: ResponseData;
    try {
      const client = request.body;
      res = await adminAccountService.updateClient(client);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }  
    
    super.responseJson(response, res);
  }
}

export default AdminAccountController;