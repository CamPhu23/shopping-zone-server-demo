import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { PaymentService } from './payment-service';

const productService = new ProductService();
const authService = new AuthService();
const paymentService = new PaymentService();

export {
  productService,
  authService,
  paymentService
};