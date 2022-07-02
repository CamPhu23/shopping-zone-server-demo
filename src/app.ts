import express from 'express';
import cors from 'cors';
import BaseController from './controllers/base-controller';

export default class App {
  private app: express.Application;
  private port: string;

  constructor(controllers: BaseController[], port: string) {
    this.app = express();
    this.port = port;

    this.intializeMiddlewares();
    this.intializeControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }

  private intializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private intializeControllers(controllers: BaseController[]) {
    controllers.forEach((controller: BaseController) => {
      this.app.use('/', controller.router);
    })
  }
}