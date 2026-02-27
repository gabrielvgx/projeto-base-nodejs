import { Router, type Application } from 'express';
import { ActivityValidation } from '@validations';
import { ActivityController } from '@controllers';
import type { Request, Response } from '@types';
import { UserScopeMiddleware } from '@middlewares';
class ActivityRoute {
  register(app: Application) {
    const router = Router();
    router.use('/activity', UserScopeMiddleware.adminOnly());
    router.post(
      '/activity',
      UserScopeMiddleware.adminOnly(),
      ActivityValidation.create,
      async (req: Request, res) => {
        const result = await ActivityController.create(req.body);
        res.json(result);
      },
    );

    router.get(
      '/activity',
      UserScopeMiddleware.adminOnly(),
      async (__req: Request, res: Response) => {
        const result = await ActivityController.list();
        res.json(result);
      },
    );

    router.get(
      '/activity/:id',
      UserScopeMiddleware.adminOnly(),
      async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await ActivityController.find(id);
        res.json(result);
      },
    );

    router.put(
      '/activity/:id',
      UserScopeMiddleware.adminOnly(),
      async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const result = await ActivityController.update(id, req.body);
        res.json(result);
      },
    );

    router.delete(
      '/activity/:id',
      UserScopeMiddleware.adminOnly(),
      async (req: Request, res: Response) => {
        const id = req.params.id as string;
        await ActivityController.delete(id);
        res.status(204).send();
      },
    );

    app.use(router);
  }
}

const instance = new ActivityRoute();
export { instance as ActivityRoute };
export default instance;
