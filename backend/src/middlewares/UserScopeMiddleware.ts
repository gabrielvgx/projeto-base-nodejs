import { JWT } from '@utils';
import type { Request, Response, NextFunction } from '@types';
import { RequestUtil } from '@utils';
import { UserRole } from '@validations';

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

const instance = new UserScopeMiddleware();
export { instance as UserScopeMiddleware };
