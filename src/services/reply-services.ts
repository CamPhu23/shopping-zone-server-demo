import { commentRepository } from "../repositories";
import { ResponseData } from "../data/models";
import { ResultCode } from "../utils";

export class ReplyService {
    private response: ResponseData;
    
    async addReply(name: string, content: string, product: string, replyTo: string | null ): Promise<any>{
        try {
            const comment = await commentRepository.saveReply(name, content, product, replyTo)
            return (this.response = {
                status: ResultCode.SUCCESS,
                result: comment
            })  
        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }


    async deleteReply(commentID: string, replyID: string, product: string): Promise<any>{
        try {
            const deletedReply = await commentRepository.deleteReply(commentID, replyID, product);
            return (
                this.response = {
                    status: ResultCode.SUCCESS,
                    result: deletedReply
                }
            )
        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }


    async editReply(id: string, name: string, content: string): Promise<any>{
        try {
            const editReply = await commentRepository.editComment(id, name, content)
            return (
                this.response = {
                    status: ResultCode.SUCCESS,
                    result: editReply
                }
            )
           
        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }
}