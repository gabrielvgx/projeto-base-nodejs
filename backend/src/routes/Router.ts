import type { Application } from '../@types/server.js';
import UserRoute from './UserRoute.js';

class Router {
  register(app: Application) {
    UserRoute.register(app);
  }
}

export default new Router();
