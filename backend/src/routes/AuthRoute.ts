import { AuthController } from '@controllers';
import type { Application } from 'express';

class AuthRoute {
  register(app: Application) {
    app.post('/auth', async (req, res) => {
      try {
        const result = await AuthController.authenticate(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error authenticating user. ${error instanceof Error ? error.message : ''}`);
      }
    });
  }
}

const instance = new AuthRoute();
export { instance as AuthRoute };
export default instance;
