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

      let clients = await clientRepository.getClientByMonthAndYear();
      let products = await productRepository.getProductByMonthAndYear();
      let receipts = await receiptRepository.getReceiptByMonthAndYear();

      let overview = [];
      for (var month = 1; month < 13; month++) {
        var m = month < 10 ? "0" + month : "" + month;

        var client = clients.filter(({ _id, ...client }: any) => _id === m)
          .map(({ _id, numberofclients }: any) => numberofclients);
        var product = products.filter(({ _id, ...product }: any) => _id === m)
          .map(({ _id, numberofproducts }: any) => numberofproducts);
        var receipt = receipts.filter(({ _id, ...receipt }: any) => _id === m)
          .map(({ _id, numberofreceipts }: any) => numberofreceipts);

        overview.push({
          month: m,
          client: client[0],
          product: product[0],
          receipt: receipt[0]
        });
      }

      return (res = {
        status: ResultCode.SUCCESS,
        result: { overview, totalAccounts, totalProducts, totalReceipts },
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
