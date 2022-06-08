import jwt from "jsonwebtoken";
import _ from "lodash";
import { ResponseData } from "../data/models";
import { receiptRepository, warehouseRepository } from "../repositories";
import { ResultCode } from "../utils";

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
      return (res = {
        status: ResultCode.BAD_INPUT_DATA,
        message: "Some products are not exists: " + JSON.stringify(notExist)
      })
    }

    // check quantity in warehoust before save receipt
    const notEnough = await warehouseRepository.checkEnoughQuantity((paymentInfo as any).products);

    if (!_.isEmpty(notEnough) || notEnough.length !== 0) {
      let resError = "";
      
      notEnough.forEach(p => {
        resError += ", Sản phẩm: " + p.name + ", màu: " + p.color + ", size: " +  p.size + ", chỉ còn: " + p.quantityExist;
      });
      resError.substring(2);

      return (res = {
        status: ResultCode.BAD_INPUT_DATA,
        message: JSON.stringify(resError)
      })
    }

    // save receipt and update quantity in warehoust
    warehouseRepository.updateQuantity((paymentInfo as any).products);
    (paymentInfo as any).account = account.id;
    const newReceipt = await receiptRepository.saveReceipt(paymentInfo);

    return (res = {
      status: ResultCode.SUCCESS,
      result: newReceipt
    });

  }
}