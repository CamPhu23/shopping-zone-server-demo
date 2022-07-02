import express from "express";
import { commentService } from "../services";
import BaseController from "./base-controller";
const mongoose = require('mongoose');

class CommentController extends BaseController {
  private path = "/comment";

  constructor() {
    super();
    this.initializeRouters();
  }

  protected initializeRouters(): void {
    this.router.post(`${this.path}/addcomment`, this.addComment);
  }

  private async addComment(
    request: express.Request,
    response: express.Response
  ): Promise<any> {
    const { nameOfCustomer, content, productID } = request.body;

    const res = await commentService.addComment(nameOfCustomer, content, productID);

    super.responseJson(response, res);

  }

}

export default CommentController;