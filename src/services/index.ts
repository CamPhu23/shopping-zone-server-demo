import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { CommentService } from './comment-services';
import { ReplyService } from './admin/admin-comment-services';
import { PaymentService } from './payment-service';
import { AccountService } from './account-service';
import { AdminProductService } from './admin/admin-product-service'
import { AdminAuthService } from './admin/admin-auth-service';
import { AdminAccountService } from './admin/admin-account-service';
import { AdminStatisticsService } from './admin/admin-statistics-service';
import { AdminReceiptService } from './admin/admin-receipt-service';
import { AdminWarehouseService } from './admin/admin-warehouse-service';

const productService = new ProductService();
const authService = new AuthService();
const commentService = new CommentService();
const replyService = new ReplyService();
const paymentService = new PaymentService();
const accountService = new AccountService()
const adminProductService = new AdminProductService();
const adminAuthService = new AdminAuthService();
const adminAccountService = new AdminAccountService();
const adminStatisticService = new AdminStatisticsService();
const adminReceiptService = new AdminReceiptService();
const adminWarehouseService = new AdminWarehouseService();

export {
  productService,
  authService,
  paymentService,
  accountService,
  commentService,
  replyService,
  adminProductService,
  adminAuthService,
  adminAccountService,
  adminStatisticService,
  adminReceiptService,
  adminWarehouseService,
};