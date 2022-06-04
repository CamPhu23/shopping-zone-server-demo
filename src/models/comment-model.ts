import { timeStamp } from "console";
import { Schema, model, Types } from "mongoose";
import { Admin } from "./admin-model";
import { Client } from "./client-model";
import { Product } from "./product-model";

interface IComment{
    name: string; 
    content: string;
    product: Types.ObjectId;
    replyTo: Types.ObjectId;
    isMarked: boolean;
}

export class Comment{
    id: string;
    name: string;
    content: string;
    product: Product | null;
    replyTo: Comment | null;
    isMarked: boolean;

    static fromData(data: any): Comment{
        const comment = new Comment();
        comment.id = data.id as string;
        comment.name = data.name;
        comment.content = data.content;
        comment.replyTo = data.replyTo; //? Comment.fromData(data.replyTo): null;
        comment.isMarked = data.isMarked;

        return comment;
    }
}

const schema = new Schema<IComment>({
    name: {
        type: String,
        required: true
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
        default: undefined,
        required: false,
        sparse: true
    },

    isMarked: {
        type: Boolean, 
        required: false,
        default: false
    },
    
}, { timestamps: true})

export const CommentModel = model<IComment>("comments", schema);