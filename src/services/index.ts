import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { PaymentService } from './payment-service';
import { AccountService } from './account-service';
const productService = new ProductService();
const authService = new AuthService();
const paymentService = new PaymentService();
const accountService = new AccountService()
export {
  productService,
  authService,
  paymentService,
  accountService
};