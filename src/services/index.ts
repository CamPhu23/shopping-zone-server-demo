import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { CommentService } from './comment-services';
import { ReplyService } from './reply-services';

const productService = new ProductService();
const authService = new AuthService();
const commentService = new CommentService();
const replyService = new ReplyService();
export {
  productService,
  authService,
  commentService,
  replyService
};