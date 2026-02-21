import type { Application } from 'express';
import { ActivityValidation } from '@validations';
import { ActivityController } from '@controllers';

class ActivityRoute {
  register(app: Application) {
    app.post('/activity', ActivityValidation.create, async (req, res) => {
      try {
        const result = await ActivityController.create(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error creating activity. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/activity', async (__req, res) => {
      try {
        const result = await ActivityController.list();
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing activities. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/activity/:id', async (req, res) => {
      try {
        const result = await ActivityController.find(req.params.id);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing activity. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.put('/activity/:id', async (req, res) => {
      try {
        const result = await ActivityController.update(req.params.id, req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error updating activity. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.delete('/activity/:id', async (req, res) => {
      try {
        await ActivityController.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(`Error deleting activity. ${error instanceof Error ? error.message : ''}`);
      }
    });
  }
}

const instance = new ActivityRoute();
export { instance as ActivityRoute };
export default instance;
