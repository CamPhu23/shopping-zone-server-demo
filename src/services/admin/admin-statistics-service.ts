import { ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";
import { clientRepository, productRepository, receiptRepository } from "../../repositories";

export class AdminStatisticsService {
  async getReceiptsClientsProductsStatistic(): Promise<ResponseData> {
    let res: ResponseData;

    try {
      let totalReceipts = await receiptRepository.countAll();
      let totalAccounts = await clientRepository.countAll();
      let totalProducts = await productRepository.countAll();

      return (res = {
        status: ResultCode.SUCCESS,
        result: {totalAccounts, totalProducts, totalReceipts},
      });
    }
    catch (e) {
      return (res = {
        status: ResultCode.FAILED,
        message: "Undefined error",
      });
    }
  }
}
