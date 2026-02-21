import type { Application } from 'express';
import { AppMiddleware } from './AppMiddleware.js';

class MiddlewareManager {
  register(app: Application) {
    AppMiddleware.register(app);
  }
}

const instance = new MiddlewareManager();
export { instance as MiddlewareManager };
