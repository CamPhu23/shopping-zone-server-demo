import express from "express";
import { commentService, replyService } from "../../services";
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
    const res = await replyService.getAll();

    super.responseJson(response, res);
  }

  private async markComment(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const data = request.body
    const res = await replyService.markComment(data.ids);

    super.responseJson(response, res);
  }

  private async addReplies(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const { product, content, replyTo } = request.body;

    // convert string to ObjectId types
    const res = await replyService.addReply(product, content, replyTo);

    super.responseJson(response, res);
  }

  private async deleteComments(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const { ids, productID } = request.body
    const res = await replyService.deleteComments(ids, productID);

    super.responseJson(response, res)
  }

  private async editReply(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const comment = request.body

    const res = await replyService.editReply(comment);

    super.responseJson(response, res)
  }
}

export default AdminCommentController;