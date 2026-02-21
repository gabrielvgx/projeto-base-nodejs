import type { Application } from 'express';
import { ProductValidation } from '@validations';
import { ProductController } from '@controllers';

class ProductRoute {
  register(app: Application) {
    app.post('/product', ProductValidation.create, async (req, res) => {
      try {
        const result = await ProductController.create(req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error creating user. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/product', async (__req, res) => {
      try {
        const result = await ProductController.list();
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing products. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.get('/product/:id', async (req, res) => {
      try {
        const result = await ProductController.find(req.params.id);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error listing products. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.put('/product/:id', async (req, res) => {
      try {
        const result = await ProductController.update(req.params.id, req.body);
        res.json(result);
      } catch (error) {
        res.status(500).send(`Error updating product. ${error instanceof Error ? error.message : ''}`);
      }
    });

    app.delete('/product/:id', async (req, res) => {
      try {
        await ProductController.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).send(`Error deleting product. ${error instanceof Error ? error.message : ''}`);
      }
    });
  }
}

const instance = new ProductRoute();
export { instance as ProductRoute };
export default instance;
