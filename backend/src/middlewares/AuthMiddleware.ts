import { AppError } from '@error';
import { LoggableBase } from '@logger';
import type { Request, Response, NextFunction, Application } from '@types';
import { HttpCode, JWT, ResponseUtil } from '@utils';
import z from 'zod';

class AuthMiddleware extends LoggableBase {
  priority = 1;
  isPublicRoute(req: Request) {
    const publicRoutes = [
      '/auth',
      '/product',
      '/product/:id',
      '/debug/gmail/oauth2callback',
      '/user/forgot-password',
      '/user/forgot-password/validate-otp',
    ];
    const cleanedPath = req.path.replace(/\/$/, '');
    const [basePath, uuid = ''] = cleanedPath.split('/').slice(1);
    const { success: hasUUID } = z.safeParse(
      z.object({
        uuid: z.uuid(),
      }),
      { uuid },
    );
    return publicRoutes.some((publicRoute) => {
      const isEqualSimpleRoute = publicRoute === cleanedPath;
      const isEqualDynamicRoute =
        publicRoute.includes(':id') &&
        hasUUID &&
        publicRoute.replace('/:id', '') === `/${basePath}`;

      return isEqualSimpleRoute || isEqualDynamicRoute;
    });
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
