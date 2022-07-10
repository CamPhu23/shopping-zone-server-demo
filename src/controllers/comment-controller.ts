import express from "express";
import { ResponseData } from "../data/models";
import { commentService } from "../services";
import { ResultCode } from "../utils";
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
    let res: ResponseData;
    try {
      const { nameOfCustomer, content, productID } = request.body;
      res = await commentService.addComment(nameOfCustomer, content, productID);
    } catch (error) {
      res = {
        status: ResultCode.FAILED,
      }
    } 

    super.responseJson(response, res);
  }
}

export default CommentController;