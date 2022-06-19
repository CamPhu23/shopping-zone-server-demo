import { connectMongoDB } from './config/database'
import App from './app';
import ProductController from './controllers/product-controller';
import AuthenticationController from './controllers/auth-controller';
import PaymentController from './controllers/payment-controller';
import AdminAuthenticationController from './controllers/admin/admin-auth-controller';
import AdminAccountController from './controllers/admin/admin-account-controller';
import AdminStatisticController from './controllers/admin/admin-statistics-controller';

connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController(),
  new AuthenticationController(),
  new PaymentController(),
  new AdminAuthenticationController(),
  new AdminAccountController(),
  new AdminStatisticController(),
], PORT as string);

app.listen();