import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { CommentService } from './comment-services';

const productService = new ProductService();
const authService = new AuthService();
const commentService = new CommentService()

export {
  productService,
  authService,
  commentService,

};