import UserController from '@controllers/UserController.js';
import type { Application } from 'express';
import UserValidation from '@validations/UserValidation.js';

class UserRoute {
  register(app: Application) {
    app.post('/user', UserValidation.create, async (req, res) => {
      try {
        const result = await UserController.create(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error creating user. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/user', async (__req, res) => {
      try {
        const result = await UserController.list();
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing users. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/user/:id', async (req, res) => {
      try {
        const result = await UserController.find({ id: req.params.id });
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing users. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.put('/user/:id', async (req, res) => {
      try {
        const result = await UserController.update(req.params.id, req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error updating user. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.delete('/user/:id', async (req, res) => {
      try {
        await UserController.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(`Error deleting user. ${error instanceof Error ? error.message : ''}`);
      }
    });
  }
}

export default new UserRoute();
