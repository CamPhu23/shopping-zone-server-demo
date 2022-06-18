import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { PaymentService } from './payment-service';
import { AdminProductService } from './admin/admin-product-service'
import { AdminAuthService } from './admin/admin-auth-service';
import { AdminAccountService } from './admin/admin-account-service';
import { AdminStatisticsService } from './admin/admin-statistics-service';

const productService = new ProductService();
const authService = new AuthService();
const paymentService = new PaymentService();
const adminProductService = new AdminProductService();
const adminAuthService = new AdminAuthService();
const adminAccountService = new AdminAccountService();
const adminStatisticService = new AdminStatisticsService();

export {
  productService,
  authService,
  paymentService,
  adminProductService,
  adminAuthService,
  adminAccountService,
  adminStatisticService,
};