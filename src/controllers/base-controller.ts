import express, { Router } from 'express'
import { ResultCode, HttpCode } from '../utils'
import { ResponseData } from '../data/models'

abstract class BaseController {
  public router = express.Router();

  protected abstract initializeRouters(): void;

  protected async responseJson(response: express.Response, data: ResponseData): Promise<any> {
    switch (data.status) {
      case ResultCode.SUCCESS:
        response.status(HttpCode.OK);
        response.json(data.result);
        break;
      case ResultCode.BAD_INPUT_DATA:
        response.status(HttpCode.BAD_REQUEST);
        response.json({ messages: data.message || 'bad input' });
        break;
      case ResultCode.NOT_HAVE_PERMISSION:
        response.status(HttpCode.FORBIDDEN);
        response.json({ messages: data.message || 'forbiden' });
        break;
      case ResultCode.NOT_FOUND:
        response.status(HttpCode.NOT_FOUND);
        response.json({ messages: data.message || 'not found' });
        break;
      case ResultCode.NOT_AUTHORIZE:
        response.status(HttpCode.NOT_AUTHORIZED);
        response.json({ messages: data.message || 'not authorize' });
        break;
      case ResultCode.FAILED:
        response.status(HttpCode.SERVER_ERROR);
        response.json({ messages: data.message || 'server run failed' })
        break;
      case ResultCode.GONE:
        response.status(HttpCode.GONE);
        response.json({ messages: data.message || 'expired' })
        break;
      default:
        response.status(HttpCode.SERVER_ERROR);
        response.json({ messages: 'server error' });
        break;
    }
  }
}

export default BaseController;