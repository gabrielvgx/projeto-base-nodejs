import type { Application } from '../@types/server.js';
import AuthRoute from './AuthRoute.js';
import UserRoute from './UserRoute.js';

class Router {
  register(app: Application) {
    UserRoute.register(app);
    AuthRoute.register(app);
  }
}

export default new Router();
