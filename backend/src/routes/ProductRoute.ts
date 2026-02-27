import { Router, type Application } from 'express';
import { ProductValidation } from '@validations';
import { ProductController } from '@controllers';
import type { Request, Response } from '@types';
import { UserScopeMiddleware } from '@middlewares';

class ProductRoute {
  register(app: Application) {
    const router = Router();
    router.use('/product', UserScopeMiddleware.adminOnly());
    router.post('/product', ProductValidation.create, async (req, res) => {
      const result = await ProductController.create(req.body);
      res.json(result);
    });

    router.get('/product', async (__req: Request, res: Response) => {
      const result = await ProductController.list();
      res.json(result);
    });

    router.get('/product/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ProductController.find(id);
      res.json(result);
    });

    router.put('/product/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ProductController.update(id, req.body);
      res.json(result);
    });

    router.delete('/product/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await ProductController.delete(id);
      res.status(204).send();
    });

    app.use(router);
  }
}

const instance = new ProductRoute();
export { instance as ProductRoute };
export default instance;
