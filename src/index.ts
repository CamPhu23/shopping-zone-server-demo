import App from './app';
import { connectMongoDB } from './config/database';
import AuthenticationController from './controllers/auth-controller';
import CommentController from './controllers/comment-controller';
import ProductController from './controllers/product-controller';
import AdminReplyController from './controllers/admin/admin-comment-controller';
import PaymentController from './controllers/payment-controller';
import AdminAuthenticationController from './controllers/admin/admin-auth-controller';
import AdminAccountController from './controllers/admin/admin-account-controller';
import AdminStatisticController from './controllers/admin/admin-statistics-controller';
import AdminProductController from './controllers/admin/admin-product-controller';
import AdminReceiptController from './controllers/admin/admin-receipt-controller';

connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController(),
  new AuthenticationController(),
  new CommentController(),
  new AdminReplyController(),
  new PaymentController(),
  new AdminAuthenticationController(),
  new AdminAccountController(),
  new AdminStatisticController(),
  new AdminProductController(),
  new AdminReceiptController(),
], PORT as string);

app.listen();