import express from "express";
import { commentService, replyService} from "../../services";
import BaseController from "../base-controller";
const mongoose = require('mongoose');

class AdminCommentController extends BaseController {
  private path = "/comment";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/admin/addreply`, this.addReplies);
    this.router.post(`${this.path}/admin/deletecreply`, this.deleteReply);
    this.router.post(`${this.path}/admin/editreply`, this.editReply);
    this.router.post(`${this.path}/admin/deletecomment`, this.deleteComment);

  }

  private async addReplies(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {productID, content, replyTo} = request.body;
    const name = 'Admin'
    // convert string to ObjectId types
    let product = mongoose.Types.ObjectId(productID)
    const res = await replyService.addReply(name, content, product, replyTo);
    // console.log(res)
    super.responseJson(response, res);
  }

  private async deleteReply(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {commentID, replyID, productID} = request.body
    const res = await replyService.deleteReply(commentID, replyID, productID);
    // console.log(res)
    super.responseJson(response, res)
  }

  private async editReply(
    request: express.Request,
    response: express.Response
  ): Promise<any>{
    const {commentID, name, content} = request.body
    // console.log("comment id: ", commentID)
    // console.log({name, content})
    const res = await replyService.editReply(commentID, name, content);
    // console.log(res)
    super.responseJson(response, res)
  }

  private async deleteComment(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {commentID, replyID, productID} = request.body
    const res = await commentService.deleteComment(commentID, replyID, productID);
    // console.log(res)
    super.responseJson(response, res)
  }
}

export default AdminCommentController;