import express from "express";
import { adminAccountService } from '../../services';
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

    const account = request.body;

    const res = await adminAccountService.createClient(account);

    super.responseJson(response, res);
  }

  private async getAdminInfo(
    request: express.Request,
    response: express.Response): Promise<any> {
    let token = request.headers.authorization?.split(" ")[1];
    const res = await adminAccountService.getUsernameByToken(token || "");

    super.responseJson(response, res);
  }

  private async getAllClients(
    request: express.Request,
    response: express.Response): Promise<any> {

    const res = await adminAccountService.getAllClients();

    super.responseJson(response, res);
  }

  private async getClient(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const { id } = request.params;

    const res = await adminAccountService.getClient(id);
    super.responseJson(response, res);
  }

  private async deleteClient(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const { id } = request.params;

    const res = await adminAccountService.deleteClient(id);
    super.responseJson(response, res);
  }

  private async updateClient(
    request: express.Request,
    response: express.Response): Promise<any> {

    const client = request.body;
    const res = await adminAccountService.updateClient(client);

    super.responseJson(response, res);
  }
}

export default AdminAccountController;