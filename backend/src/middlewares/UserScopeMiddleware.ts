import { HttpCode, JWT } from '@utils';
import type { Request, Response, NextFunction } from '@types';
import { RequestUtil, ResponseUtil } from '@utils';
import { UserRole } from '@validations';
import { AppError } from '@error';

class UserScopeMiddleware {
  hasAccess = (
    req: Request,
    res: Response,
    next: NextFunction,
    allowedRoles: UserRole[],
  ) => {
    const token = RequestUtil.getToken(req);
    if (!token) {
      ResponseUtil.handleError(
        res,
        new AppError('Unauthorized. No token provided.', HttpCode.UNAUTHORIZED),
      );
      return;
    }
    const { role } = JWT.validate(token) || {};
    if (!allowedRoles.includes(role)) {
      ResponseUtil.handleError(
        res,
        new AppError('Access denied. Insufficient permissions.', HttpCode.FORBIDDEN),
      );
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
