import express from "express";
import { commentService} from "../../../services";
import BaseController from "../../base-controller";
const mongoose = require('mongoose');

class AdminCommentController extends BaseController {
  private path = "/comment";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/admin/addreply`, this.addReplies);
    this.router.delete(`${this.path}/admin/deletecomment`, this.deleteComment);
    this.router.delete(`${this.path}/admin/deletecreply`, this.deleteReply);
    this.router.put(`${this.path}/admin/editcomment`, this.editComment);
  }

  private async addReplies(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {productID, content, replyTo} = request.body;
    const name = 'Admin'
    // convert string to ObjectId types
    let product = mongoose.Types.ObjectId(productID)
    const res = await commentService.addReply(name, content, product, replyTo);
    console.log(res)
    super.responseJson(response, res);
  }


  private async deleteComment(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {commentID, replyID, productID} = request.body
    const res = await commentService.deleteComment(commentID, replyID, productID);
    console.log(res)
    super.responseJson(response, res)
  }

  private async deleteReply(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const {commentID, replyID, productID} = request.body
    const res = await commentService.deleteReply(commentID, replyID, productID);
    console.log(res)
    super.responseJson(response, res)
  }

  private async editComment(
    request: express.Request,
    response: express.Response
  ): Promise<any>{
    const {commentID, name, content} = request.body
    // console.log("comment id: ", commentID)
    // console.log({name, content})
    const res = await commentService.editComment(commentID, name, content);
    console.log(res)
    super.responseJson(response, res)
  }
}

export default AdminCommentController;