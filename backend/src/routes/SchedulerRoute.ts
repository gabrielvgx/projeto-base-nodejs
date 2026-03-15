import { SchedulerController } from '@controllers';
import { Router, type Application } from 'express';
import { SchedulerValidation, UserRole } from '@validations';
import type { Request, Response } from '@types';
import type { SchedulerWhereInput } from '../generated/prisma/models.js';

class SchedulerRoute {
  register(app: Application) {
    const router = Router();
    router.post('/scheduler', SchedulerValidation.create, async (req, res) => {
      const result = await SchedulerController.create(req.body);
      res.json(result);
    });

    router.get('/scheduler', async (req: Request, res: Response) => {
      const customerId = req.user?.id || '';
      const isAdmin = req.user?.role === UserRole.ADMIN;
      const filter: SchedulerWhereInput = isAdmin ? {} : { customerId };
      const result = await SchedulerController.list(filter);
      res.json(result);
    });

    router.get('/scheduler/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SchedulerController.find(id);
      res.json(result);
    });

    router.patch('/scheduler/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SchedulerController.update(id, req.body);
      res.json(result);
    });

    router.delete('/scheduler/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await SchedulerController.delete(id);
      res.status(204).send();
    });
    app.use(router);
  }
}

const instance = new SchedulerRoute();
export { instance as SchedulerRoute };
export default instance;
