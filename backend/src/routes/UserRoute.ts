import { UserController } from '@controllers';
import type { Application } from 'express';
import { UserValidation } from '@validations';
import type { Request, Response } from '@types';

class UserRoute {
  register(app: Application) {
    app.post('/user', UserValidation.create, async (req: Request, res: Response) => {
      const result = await UserController.create(req.body);
      res.json(result);
    });

    app.get('/user', async (__req: Request, res: Response) => {
      const result = await UserController.list();
      res.json(result);
    });

    app.get('/user/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await UserController.find({ id });
      res.json(result);
    });

    app.put('/user/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await UserController.update(id, req.body);
      res.json(result);
    });

    app.delete('/user/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await UserController.delete(id);
      res.status(204).send();
    });
  }
}

const instance = new UserRoute();
export { instance as UserRoute };
export default instance;
