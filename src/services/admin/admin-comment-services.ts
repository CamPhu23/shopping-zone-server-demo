import { commentRepository, productRepository } from "../../repositories";
import { ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";

export class ReplyService {
    private response: ResponseData;

    async markComment(ids: string[]): Promise<any> {
        try {
            await commentRepository.markComment(ids)
            return (this.response = {
                status: ResultCode.SUCCESS,
            })
        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }

    async getAll(): Promise<any> {
        try {
            const comments = await commentRepository.getAll();
            return (this.response = {
                status: ResultCode.SUCCESS,
                result: comments
            })
        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }

    async addReply(productID: string, content: string, replyTo: string | null): Promise<any> {
        try {
            const comment = await commentRepository.saveComment("Quản trị viên", productID, content, replyTo);
            await productRepository.saveReply(productID, comment);

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


    async deleteComments(ids: string[], productId: string): Promise<any> {
        try {
            // delete comments
            await commentRepository.deleteComments(ids);

            // delete comments reference in product
            await productRepository.deleteComments(ids, productId);
            return (
                this.response = {
                    status: ResultCode.SUCCESS,
                }
            )
        } catch (error: any) {
            return (this.response = {
                status: ResultCode.FAILED,
                message: error.message || ''
            })
        }
    }


    async editReply(comment: any): Promise<any> {
        try {
            const editReply = await commentRepository.editComment(comment)
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