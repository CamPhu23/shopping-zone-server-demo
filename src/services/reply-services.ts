import { commentRepository } from "../repositories";
import { ResponseData } from "../data/models";
import { ResultCode } from "../utils";

export class ReplyService {
    private response: ResponseData;
    
    async addReply(name: string, content: string, product: string, replyTo: string | null ): Promise<any>{
        try {
            const comment = await commentRepository.saveReply(name, content, product, replyTo)
            return comment
            ? (this.response = {
                status: ResultCode.SUCCESS,
                result: comment
            })
            : (this.response = {
                status: ResultCode.FAILED,
                message: "Comment/Reply fail"
            })
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
                    result: deletedReply
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


    async editReply(id: string, name: string, content: string): Promise<any>{
        try {
            const editReply = await commentRepository.editComment(id, name, content)
            return editReply
            ? (
                this.response = {
                    status: ResultCode.SUCCESS,
                    result: editReply
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