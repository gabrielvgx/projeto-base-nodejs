import { UserController } from '@controllers';
import { Router, type Application } from 'express';
import { UserValidation } from '@validations';
import type { Request, Response } from '@types';
import { UserScopeMiddleware } from '@middlewares';
import { JWT } from '@utils';

class UserRoute {
  register(app: Application) {
    const router = Router();
    router.post(
      '/user',
      UserScopeMiddleware.adminOnly(),
      UserValidation.create(),
      async (req: Request, res: Response) => {
        const result = await UserController.create(req.body);
        res.status(201).json(result);
      },
    );

    router.get(
      '/user',
      UserScopeMiddleware.adminOnly(),
      async (__req: Request, res: Response) => {
        const result = await UserController.list();
        res.json(result);
      },
    );

    router.get(
      '/user/:id',
      UserScopeMiddleware.onlyAdminOrSameUser(),
      async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await UserController.find({ id });
        if (result === null) {
          res.status(404).json({
            message: 'User not found',
          });
          return;
        }
        res.json(result);
      },
    );

    router.patch(
      '/user/:id',
      UserScopeMiddleware.onlyAdminOrSameUser(),
      async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await UserController.update(id, req.body);
        res.json(result);
      },
    );

    router.delete(
      '/user/:id',
      UserScopeMiddleware.onlyAdminOrSameUser(),
      async (req: Request, res: Response) => {
        const id = req.params.id as string;
        await UserController.delete(id);
        res.status(204).send();
      },
    );

    router.post(
      '/user/forgot-password',
      UserValidation.forgotPassword(),
      async (req: Request, res: Response) => {
        const result = await UserController.forgotPassword(req.body.email);
        res.status(200).send(result);
      },
    );

    router.post(
      '/user/forgot-password/validate-otp',
      UserValidation.validateOTP(),
      async (req: Request, res: Response) => {
        const params = req.body;
        const isValid = await UserController.validateOTP(params);
        if (isValid) {
          const token = JWT.generate({
            email: params.email,
            operation: 'RESET_PASSWORD',
          });
          res.status(200).json({ token });
        } else {
          res.status(400).send({
            message: 'INVALID_OTP_OR_EXPIRED',
          });
        }
      },
    );

    app.use(router);
  }
}

const instance = new UserRoute();
export { instance as UserRoute };
export default instance;
