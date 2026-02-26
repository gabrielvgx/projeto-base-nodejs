import { SchedulerController } from '@controllers';
import type { Application } from 'express';
import { SchedulerValidation } from '@validations';
import type { Request, Response } from '@types';

class SchedulerRoute {
  register(app: Application) {
    app.post('/scheduler', SchedulerValidation.create, async (req, res) => {
      const result = await SchedulerController.create(req.body);
      res.json(result);
    });

    app.get('/scheduler', async (__req: Request, res: Response) => {
      const result = await SchedulerController.list();
      res.json(result);
    });

    app.get('/scheduler/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SchedulerController.find(id);
      res.json(result);
    });

    app.put('/scheduler/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await SchedulerController.update(id, req.body);
      res.json(result);
    });

    app.delete('/scheduler/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await SchedulerController.delete(id);
      res.status(204).send();
    });
  }
}

const instance = new SchedulerRoute();
export { instance as SchedulerRoute };
export default instance;
