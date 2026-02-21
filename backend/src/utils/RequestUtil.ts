import type { Request } from '../@types/server.js';

class RequestUtil {
  getToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
}

export default new RequestUtil();
