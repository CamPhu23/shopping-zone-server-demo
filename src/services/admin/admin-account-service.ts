import { AccessTokenPayload, ResponseData } from "../../data/models";
import { ResultCode } from "../../utils";
import jwt from "jsonwebtoken";

export class AdminAccountService {
  async getUsernameByToken(token: string): Promise<ResponseData> {
    let res: ResponseData;
    
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string
    );
    
    const adminUserName = (payload as AccessTokenPayload).username

    return (res = {
      status: adminUserName ? ResultCode.SUCCESS : ResultCode.FAILED,
      result: adminUserName,
    });
  }
}
