import { JWT } from '@utils';
import type { Request, Response, NextFunction } from '@types';
import { RequestUtil } from '@utils';
import { UserRole } from '@validations';

class UserScopeMiddleware {
  hasAccess = (req: Request, res: Response, next: NextFunction, allowedRoles: UserRole[]) => {
    const token = RequestUtil.getToken(req);
    if (!token) {
      res.status(401).json({ error: 'Unauthorized. No token provided.' });
      return;
    }
    const { role } = JWT.validate(token) || {};
    if (!allowedRoles.includes(role)) {
      res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      return;
    }
    next();
  };
  adminOnly = (req: Request, res: Response, next: NextFunction) => {
    this.hasAccess(req, res, next, [UserRole.ADMIN]);
  };

  professionalOnly = (req: Request, res: Response, next: NextFunction) => {
    this.hasAccess(req, res, next, [UserRole.PROFESSIONAL]);
  };

  only = (allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      this.hasAccess(req, res, next, allowedRoles);
    };
  };
}

const instance = new UserScopeMiddleware();
export { instance as UserScopeMiddleware };
