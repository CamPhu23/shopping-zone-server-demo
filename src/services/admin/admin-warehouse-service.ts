import { AccessTokenPayload, ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";
import { warehouseRepository, productRepository } from "../../repositories";

export class AdminWarehouseService {
  async importProduct(product: any): Promise<ResponseData> {
    let res: ResponseData;
    
    try {
      const productDb = await productRepository.getProductByName(product.name);
      product.id = productDb._id;

      warehouseRepository.importProduct(product)

      return (res = {
        status: ResultCode.SUCCESS,
      });
    }
    catch (err: any) {
      return (res = {
        status: ResultCode.SUCCESS,
        message: err.message || ""
      });
    }
  }
}
