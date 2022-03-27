import {ProductRepository} from './product-repository';
import { ClientRepository } from './client-repository';
import { RefreshTokenRepository } from './refresh-token-repository';

const productRepository = new ProductRepository();
const clientRepository = new ClientRepository();
const refreshTokenRepository = new RefreshTokenRepository();

export {
  productRepository,
  clientRepository,
  refreshTokenRepository,
};