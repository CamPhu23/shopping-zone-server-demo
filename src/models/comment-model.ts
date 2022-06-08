import { timeStamp } from "console";
import { Schema, model, Types } from "mongoose";
import { Admin } from "./admin-model";
import { Client } from "./client-model";
import { Product } from "./product-model";

interface IComment{
    name: String; 
    content: String;
    product: Types.ObjectId;
    replyTo: Types.ObjectId;

}

export class Comment{
    id: string;
    name: string;
    content: string;
    product: Product | null;
    replyTo: Comment | null;

    static fromData(data: any): Comment{
        const comment = new Comment();
        comment.id = data.id as string;
        comment.name = data.name;
        comment.content = data.content;
        comment.product = data.product ? Product.fromData(data.product): null;
        comment.replyTo = data.replyTo; //? Comment.fromData(data.replyTo): null;


        return comment;
    }
}

const schema = new Schema<IComment>({
    name: {
        type: String,
        required: false
    },

    content: {
        type: String,
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },

    replyTo: {
        type: Schema.Types.ObjectId, 
        ref: 'comments',
        required: false
    },
  
}, { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }})

export const CommentModel = model<IComment>("comments", schema);