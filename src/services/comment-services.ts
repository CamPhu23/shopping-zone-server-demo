import { commentRepository } from "../repositories";
import { ResponseData } from "../data/models";
import { ResultCode } from "../utils";

export class CommentService {
    private response: ResponseData;
    async addComment(name: string, content: string, product: string, replyTo: string | null ): Promise<any>{
        try {
            const addComment = await commentRepository.saveComment(name, content, product, replyTo);
            return (this.response = {
                status: ResultCode.SUCCESS,
                result: addComment
            })
            
        } catch (error) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: "Comment/Reply fail"
            })
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

    
}