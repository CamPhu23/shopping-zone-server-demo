import { commentRepository, productRepository } from "../repositories";
import { ResponseData } from "../data/models";
import { ResultCode } from "../utils";

export class CommentService {
    private response: ResponseData;
    async addComment(name: string, content: string, productID: string): Promise<any> {
        try {
            const newComment = await commentRepository.saveComment(name, productID, content, null);
            await productRepository.saveReply(productID, newComment);

            return (this.response = {
                status: ResultCode.SUCCESS,
                result: newComment
            })

        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }
}