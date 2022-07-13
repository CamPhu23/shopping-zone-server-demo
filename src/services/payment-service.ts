import jwt from "jsonwebtoken";
import _ from "lodash";
import { ResponseData } from "../data/models";
import { clientRepository, receiptRepository, warehouseRepository } from "../repositories";
import { ResultCode } from "../utils";
import { colorConverter } from "../utils/color-converter";
import receiptService from "./services mail/receipt-service"

export class PaymentService {
  async makeAPayment(paymentInfo: object, token: string): Promise<ResponseData> {
    let res: ResponseData;
    let error: string = "";
    let account: any;

    // check if user is logged in and token is not expired 
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string, function (err, decoded) {
      if (err) {
        error = err.name;
      }
      account = decoded;
    });

    if (!_.isEmpty(error)) {
      return (res = {
        status: ResultCode.NOT_AUTHORIZE,
        message: error,
      });
    }

    // check all products are exits
    const notExist = await warehouseRepository.checkAreExists((paymentInfo as any).products);

    if (!_.isEmpty(notExist) || notExist.length !== 0) {
      let resError = "";

      let notEnoughProduct = notExist[0];
      resError += "Sản phẩm: " + notEnoughProduct.name + ", màu: " + colorConverter(notEnoughProduct.color)
        + ", size: " + notEnoughProduct.size + ", không tồn tại";

      return (res = {
        status: ResultCode.BAD_INPUT_DATA,
        message: JSON.stringify(resError)
      })
    }

    // check quantity in warehoust before save receipt
    const notEnough = await warehouseRepository.checkEnoughQuantity((paymentInfo as any).products);

    if (!_.isEmpty(notEnough) || notEnough.length !== 0) {
      let resError = "";

      let notEnoughProduct = notEnough[0];
      resError += "Sản phẩm: " + notEnoughProduct.name + ", màu: " + colorConverter(notEnoughProduct.color)
        + ", size: " + notEnoughProduct.size + ", số lượng còn lại: " + notEnoughProduct.quantityExist;

      return (res = {
        status: ResultCode.BAD_INPUT_DATA,
        message: JSON.stringify(resError)
      })
    }

    // save receipt and update quantity in warehoust
    warehouseRepository.updateQuantity((paymentInfo as any).products);
    (paymentInfo as any).client = account.id;
    const newReceipt = await receiptRepository.saveReceipt(paymentInfo);
    await clientRepository.saveReceipt(newReceipt.id, account.id);

    // send receipt mail
    receiptService(newReceipt, newReceipt.email);

    return (res = {
      status: ResultCode.SUCCESS,
      result: newReceipt
    });

  }
}