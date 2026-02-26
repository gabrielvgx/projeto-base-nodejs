import type { Application } from 'express';
import { ProductValidation } from '@validations';
import { ProductController } from '@controllers';
import type { Request, Response } from '@types';

class ProductRoute {
  register(app: Application) {
    app.post('/product', ProductValidation.create, async (req, res) => {
      const result = await ProductController.create(req.body);
      res.json(result);
    });

    app.get('/product', async (__req: Request, res: Response) => {
      const result = await ProductController.list();
      res.json(result);
    });

    app.get('/product/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ProductController.find(id);
      res.json(result);
    });

    app.put('/product/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const result = await ProductController.update(id, req.body);
      res.json(result);
    });

    app.delete('/product/:id', async (req: Request, res: Response) => {
      const id = req.params.id as string;
      await ProductController.delete(id);
      res.status(204).send();
    });
  }
}

const instance = new ProductRoute();
export { instance as ProductRoute };
export default instance;
