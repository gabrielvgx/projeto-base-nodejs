import { UserController } from '@controllers';
import { Router, type Application } from 'express';
import { UserValidation } from '@validations';
import type { Request, Response } from '@types';
import { UserScopeMiddleware } from '@middlewares';

class UserRoute {
  register(app: Application) {
    const router = Router();
    router.post(
      '/user',
      UserScopeMiddleware.adminOnly(),
      UserValidation.create,
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
    app.use(router);
  }
}

const instance = new UserRoute();
export { instance as UserRoute };
export default instance;
