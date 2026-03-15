import z from 'zod';
import type { Request, Response, NextFunction } from '@types';
import { ErrorValidation } from './ErrorValidation.js';
import { AppError } from '@error';
import { HttpCode } from '@utils';

class SchedulerValidation {
  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const productSchema = {
        id: z.uuid(),
        quantity: z.number().positive().int(),
      };

      const schema = {
        customerId: z.uuid(),
        scheduledAt: z.string(),
        products: z.array(z.object(productSchema)),
      };
      z.object(schema).parse(req.body);
      const { products = [] } = req.body;
      if (products.length === 0) {
        throw new AppError('At least one product must be provided', HttpCode.BAD_REQUEST);
      }
      next();
    } catch (err) {
      ErrorValidation.handleZodError(err, res);
    }
  };
}

const instance = new SchedulerValidation();
export { instance as SchedulerValidation };
