import type { Request } from '@types';

class RequestUtil {
  getToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
}

const instance = new RequestUtil();
export { instance as RequestUtil };
