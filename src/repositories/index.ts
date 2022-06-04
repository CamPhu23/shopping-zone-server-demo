import {ProductRepository} from './product-repository';
import { ClientRepository } from './client-repository';
import { RefreshTokenRepository } from './refresh-token-repository';
import { CommentRepository } from './comment-repository';


const productRepository = new ProductRepository();
const clientRepository = new ClientRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const commentRepository = new CommentRepository();

export {
  productRepository,
  clientRepository,
  refreshTokenRepository,
  commentRepository,

};