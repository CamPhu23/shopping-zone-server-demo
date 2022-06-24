import { ProductRepository } from './product-repository';
import { ClientRepository } from './client-repository';
import { AdminRepository } from './admin-repository';
import { RefreshTokenRepository } from './refresh-token-repository';
import { CommentRepository } from './comment-repository';
import { ReceiptRepository } from './receipt-repository';
import { WarehouseRepository } from './warehouse-repository';
import { ImageRepository } from './image-repository';

const productRepository = new ProductRepository();
const clientRepository = new ClientRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const commentRepository = new CommentRepository();
const receiptRepository = new ReceiptRepository();
const warehouseRepository = new WarehouseRepository();
const imageRepository = new ImageRepository();
const adminRepository = new AdminRepository();

export {
  productRepository,
  clientRepository,
  refreshTokenRepository,
  commentRepository,
  receiptRepository,
  warehouseRepository,
  imageRepository,
  adminRepository,
};