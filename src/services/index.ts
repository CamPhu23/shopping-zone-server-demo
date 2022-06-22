import { ProductService } from './product-services';
import { AuthService } from './auth-service';
import { CommentService } from './comment-services';
import { ReplyService } from './reply-services';
import { PaymentService } from './payment-service';
import { AdminProductService } from './admin/admin-product-service'
import { AdminAuthService } from './admin/admin-auth-service';
import { AdminAccountService } from './admin/admin-account-service';
import { AdminStatisticsService } from './admin/admin-statistics-service';
import { AdminReceiptService } from './admin/admin-receipt-service';

const productService = new ProductService();
const authService = new AuthService();
const commentService = new CommentService();
const replyService = new ReplyService();
const paymentService = new PaymentService();
const adminProductService = new AdminProductService();
const adminAuthService = new AdminAuthService();
const adminAccountService = new AdminAccountService();
const adminStatisticService = new AdminStatisticsService();
const adminReceiptService = new AdminReceiptService();

export {
  productService,
  authService,
  paymentService,
  commentService,
  replyService,
  adminProductService,
  adminAuthService,
  adminAccountService,
  adminStatisticService,
  adminReceiptService,
};