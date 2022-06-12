import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { PaymentService } from './payment-service';
import { AdminAuthService } from './admin/admin-auth-service';
import { AdminAccountService } from './admin/admin-account-service';
import { AdminStatisticsService } from './admin/admin-statistics-service';

const productService = new ProductService();
const authService = new AuthService();
const paymentService = new PaymentService();
const adminAuthService = new AdminAuthService();
const adminAccountService = new AdminAccountService();
const adminStatisticController = new AdminStatisticsService();

export {
  productService,
  authService,
  paymentService,
  adminAuthService,
  adminAccountService,
  adminStatisticController,
};