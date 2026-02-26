import type { Application } from 'express';
import { ActivityValidation } from '@validations';
import { ActivityController } from '@controllers';
import type { Request, Response } from '@types';
class ActivityRoute {
  register(app: Application) {
    app.post('/activity', ActivityValidation.create, async (req: Request, res) => {
      const result = await ActivityController.create(req.body);
      res.json(result);
    });

    app.get('/activity', async (__req: Request, res: Response) => {
      const result = await ActivityController.list();
      res.json(result);
    });

    app.get('/activity/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ActivityController.find(id);
      res.json(result);
    });

    app.put('/activity/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ActivityController.update(id, req.body);
      res.json(result);
    });

    app.delete('/activity/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await ActivityController.delete(id);
      res.status(204).send();
    });
  }
}

const instance = new ActivityRoute();
export { instance as ActivityRoute };
export default instance;
