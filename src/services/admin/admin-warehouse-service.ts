import { AccessTokenPayload, ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";
import { warehouseRepository, productRepository } from "../../repositories";

export class AdminWarehouseService {
  async importProduct(product: any): Promise<ResponseData> {
    let res: ResponseData;
    
    try {
      let productDb = await productRepository.getProductByName(product.name);
      product.id = productDb._id;
      
      let warehouse = await warehouseRepository.importProduct(product);
      await productRepository.updateWarehouse(productDb._id, warehouse._id);

      return (res = {
        status: ResultCode.SUCCESS,
      });
    }
    catch (err: any) {
      return (res = {
        status: ResultCode.FAILED,
        message: err.message || ""
      });
    }
  }
}
