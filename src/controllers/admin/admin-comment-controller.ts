import express from "express";
import { ResponseData } from "../../data/models";
import { commentService, replyService } from "../../services";
import { ResultCode } from "../../utils";
import BaseController from "../base-controller";

class AdminCommentController extends BaseController {
  private path = "/admin/comments";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/reply`, this.addReplies);
    this.router.post(`${this.path}/update`, this.editReply);
    this.router.post(`${this.path}/delete`, this.deleteComments);
    this.router.get(`${this.path}`, this.getAll);
    this.router.post(`${this.path}/mark`, this.markComment);
  }

  private async getAll(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      res = await replyService.getAll();
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async markComment(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const ids = request.body
      res = await replyService.markComment(ids);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async addReplies(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { productId, content, replyTo } = request.body;
      res = await replyService.addReply(productId, content, replyTo);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res);
  }

  private async deleteComments(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const { ids, productId } = request.body
      res = await replyService.deleteComments(ids, productId);  
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }

    super.responseJson(response, res)
  }

  private async editReply(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    let res: ResponseData;
    try {
      const comment = request.body
      res = await replyService.editReply(comment); 
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    }
    
    super.responseJson(response, res)
  }
}

export default AdminCommentController;