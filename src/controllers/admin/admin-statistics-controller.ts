import express from "express";
import { ResponseData } from "../../data/models";
import { adminStatisticService } from '../../services';
import { ResultCode } from "../../utils";
import BaseController from "../base-controller";

class AdminStatsticController extends BaseController {
  private path = "/admin";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.get(`${this.path}/statistics`, this.statistics);
  }

  private async statistics(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    
    try {
      res = await adminStatisticService.getReceiptsClientsProductsStatistic();
    }
    catch (e) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }
}

export default AdminStatsticController;