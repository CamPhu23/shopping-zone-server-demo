import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { PaymentService } from './payment-service';
import { AdminProductService } from './admin/admin-product-service'

const productService = new ProductService();
const authService = new AuthService();
const paymentService = new PaymentService();
const adminProductService = new AdminProductService();

export {
  productService,
  authService,
  paymentService,
  adminProductService,
};