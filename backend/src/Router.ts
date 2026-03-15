import type { Application } from 'express';
import * as routes from '@routes';

class Router {
  register(app: Application) {
    const { ...allRoutes } = routes;
    Object.values(allRoutes).forEach((route) => {
      if ('register' in route) {
        route.register(app);
      }
    });
  }
}

const instance = new Router();
export { instance as Router };
export default instance;
