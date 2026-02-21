import type { IMiddleware } from '@interfaces';
import type { Application } from 'express';
import express from 'express';

class AppMiddleware implements IMiddleware {
  register(app: Application) {
    app.use(express.json());
  }
}

const instance = new AppMiddleware();
export { instance as AppMiddleware };
