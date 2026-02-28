import { AppError } from '@error';
import { LoggableBase } from '@logger';
import type { Request, Response, NextFunction, Application } from '@types';
import { HttpCode, JWT, ResponseUtil } from '@utils';

class AuthMiddleware extends LoggableBase {
  priority = 1;
  isPublicRoute(req: Request) {
    console.log(req);
    return true;
    // const publicRoutes = ['/auth'];
    // return publicRoutes.includes(req.path.replace(/\/$/, ''));
  }
  async register(app: Application) {
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (this.isPublicRoute(req)) {
        next();
        return;
      }
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return ResponseUtil.handleError(
          res,
          new AppError('Authorization header not provided', HttpCode.UNAUTHORIZED),
        );
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return ResponseUtil.handleError(
          res,
          new AppError('Token not provided', HttpCode.UNAUTHORIZED),
        );
      }

      try {
        const decoded = JWT.validate(token);
        (req as any).user = decoded.user;
        next();
      } catch (err) {
        return ResponseUtil.handleError(
          res,
          new AppError('Invalid token', HttpCode.UNAUTHORIZED),
        );
      }
    });
  }
}

const instance = new AuthMiddleware();
export { instance as AuthMiddleware };
export default instance;
