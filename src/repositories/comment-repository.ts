import { Schema } from "mongoose";
import { Product, ProductModel } from "../models/product-model";
import { Comment, CommentModel } from "../models/comment-model";
import { BaseRepository } from "./base-repository";
const mongoose = require('mongoose');

export class CommentRepository extends BaseRepository {

  async markComment(ids: string[]): Promise<any> {
    CommentModel.updateMany({ "_id": { $in: ids } }, { $set: { isMarked: true } },
      (err: any) => { console.log(err) })
  }

  async getAll(): Promise<any> {
    return await CommentModel
      .find({}, "id content name replyTo updatedAt")
      .populate("product", "id name");
  }

  async saveComment(name: string, productID: string, content: string, replyTo: string | null): Promise<Comment | null> {
    let productMG = mongoose.Types.ObjectId(productID);

    const savereply = await CommentModel.create({ name, content, product: productMG, replyTo });

    return savereply ? Comment.fromData(savereply) : null;
  }

  async deleteComments(ids: string[]): Promise<any> {
    CommentModel.deleteMany({ "_id": { $in: ids } },
      (err) => { console.log(err); })
  }

  async editComment(comment: any): Promise<Comment | null> {
    const editedComment = await CommentModel
      .findByIdAndUpdate({ "_id": comment.id }, { content: comment.content }, { new: true });

    return editedComment ? Comment.fromData(editedComment) : null;
  }

}