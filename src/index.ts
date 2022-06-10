import App from './app';
import { connectMongoDB } from './config/database';
import AuthenticationController from './controllers/auth-controller';
import CommentController from './controllers/comment-controller';
import ProductController from './controllers/product-controller';
import AdminReplyController from './controllers/admin/admin-reply-controller';
connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController(),
  new AuthenticationController(),
  new CommentController(),
  new AdminReplyController()
], PORT as string);

app.listen();