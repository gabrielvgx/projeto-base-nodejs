import type { IMiddleware } from '@interfaces';
import { LoggableBase } from '@logger';
import type { Application } from 'express';
import express from 'express';

class AppMiddleware extends LoggableBase implements IMiddleware {
  priority = 0;
  register(app: Application) {
    app.use(express.json());
  }
}

const instance = new AppMiddleware();
export { instance as AppMiddleware };
export default instance;
