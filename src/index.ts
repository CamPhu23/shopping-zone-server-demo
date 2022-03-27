import { connectMongoDB } from './config/database'
import App from './app';
import ProductController from './controllers/product-controller';
import AuthenticationController from './controllers/auth-controller';

connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController(),
  new AuthenticationController()
], PORT as string);

app.listen();