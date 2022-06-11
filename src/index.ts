import { connectMongoDB } from './config/database'
import App from './app';
import ProductController from './controllers/product-controller';
import AuthenticationController from './controllers/auth-controller';
import PaymentController from './controllers/payment-controller';
import AccountController from './controllers/account-controller'
connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController(),
  new AuthenticationController(),
  new PaymentController(),
  new AccountController()
], PORT as string);

app.listen();