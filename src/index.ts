import { connectMongoDB } from './config/database'
import App from './app';
import ProductController from './controllers/product-controller';

connectMongoDB();

const PORT = process.env.PORT || 8888;
const app = new App([
  new ProductController()
], PORT as string);

app.listen();