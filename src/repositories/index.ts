import { ProductRepository } from './product-repository';
import { ClientRepository } from './client-repository';
import { RefreshTokenRepository } from './refresh-token-repository';
import { ReceiptRepository } from './receipt-repository';
import { WarehouseRepository } from './warehouse-repository';

const productRepository = new ProductRepository();
const clientRepository = new ClientRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const receiptRepository = new ReceiptRepository();
const warehouseRepository = new WarehouseRepository();

export {
  productRepository,
  clientRepository,
  refreshTokenRepository,
  receiptRepository,
  warehouseRepository,

};