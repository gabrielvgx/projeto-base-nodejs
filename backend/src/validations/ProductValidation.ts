import z from 'zod';
import type { Request, Response, NextFunction } from '@types';
import { ErrorValidation } from './ErrorValidation.js';

class ProductValidation {
  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = {
        name: z.string().min(3).max(255),
        description: z.optional(z.string().min(5).max(1024)),
        price: z.optional(z.number().min(0)),
        estimatedMinPrice: z.optional(z.number().min(0)),
        estimatedMaxPrice: z.optional(z.number().min(0)),
      };
      z.object(schema).parse(req.body);
      next();
    } catch (err) {
      ErrorValidation.handleZodError(err, res);
    }
  };
}

const instance = new ProductValidation();
export { instance as ProductValidation };
