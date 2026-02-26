import { AuthController } from '@controllers';
import type { Application } from 'express';

class AuthRoute {
  register(app: Application) {
    app.post('/auth', async (req, res) => {
      const result = await AuthController.authenticate(req.body);
      res.json(result);
    });
  }
}

const instance = new AuthRoute();
export { instance as AuthRoute };
export default instance;
