import {ProductService} from './product-services';
import { AuthService } from './auth-service';

const productService = new ProductService();
const authService = new AuthService();

export {
  productService,
  authService,
};