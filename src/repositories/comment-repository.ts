import { Schema } from "mongoose";
import { Product,ProductModel } from "../models/product-model";
import { Comment, CommentModel } from "../models/comment-model";
import { BaseRepository } from "./base-repository";

export class CommentRepository extends BaseRepository {
  async saveComment(
      name: string, 
      content: string, 
      product: string, 
      replyTo: string | null ): Promise<Comment | null> {
    // add new comment
    const savecomment = await CommentModel.create({ name, content, product, replyTo});

    // Push id of new comment into product (references)
    const newCommentID = savecomment._id
    await ProductModel.findByIdAndUpdate(product, {$push: {comments: newCommentID}})


    return savecomment ? Comment.fromData({
        id: savecomment.id,
        name: savecomment.name,
        content: savecomment.content,
        product: savecomment.product,
        replyTo: savecomment.replyTo
      }) : null;
  }

  async saveReply(
    name: string, 
    content: string, 
    product: string, 
    replyTo: string | null ): Promise<Comment | null> {
  // add new comment
  const savecomment = await CommentModel.create({ name, content, product, replyTo});

  // Push id of new comment into product (references)
  const newCommentID = savecomment._id
  await ProductModel.findByIdAndUpdate(product, {$push: {comments: newCommentID}})
  // Mark isMarked: true after reply
  await CommentModel.findByIdAndUpdate(replyTo, {$set: {isMarked: true}})

  return savecomment ? Comment.fromData({
      id: savecomment.id,
      name: savecomment.name,
      content: savecomment.content,
      product: savecomment.product,
      replyTo: savecomment.replyTo
    }) : null;
  }

  async deleteComment(commentID: string, replyID: string, product: string): Promise<Comment| null>{
    // delete comment in Comment document
    const deletedComment = await CommentModel.findOneAndDelete({"_id": commentID})
    // delete id comment reference in Product document
    await ProductModel.findByIdAndUpdate(product, {$pull: {comments: commentID}})
    // After comment is deleted, reply of comment should be deleted too
    await CommentModel.findOneAndDelete({"_id": replyID})
    // delete id reply reference in Product document
    await ProductModel.findByIdAndUpdate(product, {$pull: {comments: replyID}})

    return deletedComment? Comment.fromData(deletedComment): null
  }

  async deleteReply(commentID: string, id: string, product: string): Promise<Comment| null>{
    // delete comment in Comment document
    const deletedComment = await CommentModel.findOneAndDelete({"_id": id})
    // delete id comment reference in Product document
    await ProductModel.findByIdAndUpdate(product, {$pull: {comments: id}})

    // If delete reply, then isMarked in comment should be true
    await CommentModel.findByIdAndUpdate(commentID, {$set: {isMarked: false}})

    return deletedComment? Comment.fromData(deletedComment): null
  }

  async editComment(id: string, name: string, content: string): Promise<Comment | null>{
    const editComment = await CommentModel.findByIdAndUpdate(id, {name: name, content: content});
    return editComment? Comment.fromData({
      id: editComment.id,
      name: editComment.name,
      content: editComment.content
  }): null
  }
  
}