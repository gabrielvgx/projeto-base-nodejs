import JWT from '@utils/JWT.js';
import type { Request, Response, NextFunction } from '../@types/server.js';
import RequestUtil from '@utils/RequestUtil.js';
import { UserRole } from '../@types/user.js';

class UserScopeMiddleware {
  adminOnly = (req: Request, res: Response, next: NextFunction) => {
    const token = RequestUtil.getToken(req);
    if (!token) {
      res.status(401).json({ error: 'Unauthorized. No token provided.' });
    } else {
      const { role } = JWT.validate(token) || {};
      if (role !== UserRole.ADMIN) {
        res.status(403).json({ error: 'Access denied. Admin only.' });
      } else {
        next();
      }
    }
  };
}

export default new UserScopeMiddleware();
