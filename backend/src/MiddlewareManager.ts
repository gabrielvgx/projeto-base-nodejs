import type { Application } from 'express';
import * as middlewares from '@middlewares';

class MiddlewareManager {
  async register(app: Application) {
    const { ...allMiddlewares } = middlewares;
    Object.values(allMiddlewares).forEach((middleware) => {
      if ('register' in middleware) {
        middleware.register(app);
      }
    });
  }
}

const instance = new MiddlewareManager();
export { instance as MiddlewareManager };
