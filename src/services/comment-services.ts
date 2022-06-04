import { commentRepository } from "../repositories";
import { ResponseData } from "../data/models";
import { ResultCode } from "../utils";

export class CommentService {
    private response: ResponseData;
    async addComment(name: string, content: string, product: string, replyTo: string | null ): Promise<any>{
        try {
            const comment = await commentRepository.saveComment(name, content, product, replyTo);
            return comment
            ? (this.response = {
                status: ResultCode.SUCCESS,
                message: "Comment/Reply successfully"
            })
            : (this.response = {
                status: ResultCode.FAILED,
                message: "Comment/Reply fail"
            })
        } catch (error) {
            console.log(error)
        }
    }

    async addReply(name: string, content: string, product: string, replyTo: string | null ): Promise<any>{
        try {
            const comment = await commentRepository.saveReply(name, content, product, replyTo)
            return comment
            ? (this.response = {
                status: ResultCode.SUCCESS,
                message: "Comment/Reply successfully"
            })
            : (this.response = {
                status: ResultCode.FAILED,
                message: "Comment/Reply fail"
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteComment(commentID: string, replyID: string, product: string): Promise<any>{
        try {
            const deletedComment = await commentRepository.deleteComment(commentID, replyID, product)
            return deletedComment
            ? (
                this.response = {
                    status: ResultCode.SUCCESS,
                    message: "Delete comment/reply successfully"
                }
            )
            : (
                this.response = {
                    status: ResultCode.FAILED,
                    message: "Delete comment/reply fail"
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteReply(commentID: string, replyID: string, product: string): Promise<any>{
        try {
            const deletedReply = await commentRepository.deleteReply(commentID, replyID, product);
            return deletedReply
            ? (
                this.response = {
                    status: ResultCode.SUCCESS,
                    message: "Delete comment/reply successfully"
                }
            )
            : (
                this.response = {
                    status: ResultCode.FAILED,
                    message: "Delete comment/reply fail"
                }
            )
        } catch (error) {
            console.log(error)
        }
    }


    async editComment(id: string, name: string, content: string): Promise<any>{
        try {
            const editComment = await commentRepository.editComment(id, name, content)
            return editComment
            ? (
                this.response = {
                    status: ResultCode.SUCCESS,
                    message: "Edit comment/reply successfully"
                }
            )
            : (
                this.response = {
                    status: ResultCode.FAILED,
                    message: "Edit comment/reply fail"
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}