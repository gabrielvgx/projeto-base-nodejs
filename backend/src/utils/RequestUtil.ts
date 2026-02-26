import type { Request } from '@types';
import { JWT } from './JWT.js';

class RequestUtil {
  getToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
  getTokenData(req: Request) {
    const token = this.getToken(req);
    if (!token) {
      return null;
    }
    const data = JWT.validate(token) || {};
    return data;
  }
}

const instance = new RequestUtil();
export { instance as RequestUtil };
