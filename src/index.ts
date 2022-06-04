import App from './app';
import { connectMongoDB } from './config/database';
import AuthenticationController from './controllers/auth-controller';
import CommentController from './controllers/commentController/comment-controller';
import AdminCommentController from './controllers/commentController/commentControllerAdmin/admin-comment-controller';
import ProductController from './controllers/product-controller';
connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController(),
  new AuthenticationController(),
  new CommentController(),
  new AdminCommentController(),

], PORT as string);

app.listen();