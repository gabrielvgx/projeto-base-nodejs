import { SchedulerController } from '@controllers';
import type { Application } from 'express';
import { SchedulerValidation } from '@validations';

class SchedulerRoute {
  register(app: Application) {
    app.post('/scheduler', SchedulerValidation.create, async (req, res) => {
      try {
        const result = await SchedulerController.create(req.body);
        res.json(result);
      } catch (error) {
        console.log(error);
        res.status(500).send(`Error creating scheduler. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/scheduler', async (__req, res) => {
      try {
        const result = await SchedulerController.list();
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing schedulers. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/scheduler/:id', async (req, res) => {
      try {
        const result = await SchedulerController.find(req.params.id);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing scheduler. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.put('/scheduler/:id', async (req, res) => {
      try {
        const result = await SchedulerController.update(req.params.id, req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error updating scheduler. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.delete('/scheduler/:id', async (req, res) => {
      try {
        await SchedulerController.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(`Error deleting scheduler. ${error instanceof Error ? error.message : ''}`);
      }
    });
  }
}

const instance = new SchedulerRoute();
export { instance as SchedulerRoute };
export default instance;
