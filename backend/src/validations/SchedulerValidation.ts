import z from 'zod';
import type { Request, Response, NextFunction } from '@types';
import { ErrorValidation } from './ErrorValidation.js';

class SchedulerValidation {
  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const productSchema = {
        id: z.uuid(),
        quantity: z.number().positive().int(),
      };
      const activitySchema = {
        id: z.uuid(),
      };
      const schema = {
        customerId: z.uuid(),
        professionalId: z.uuid().optional(),
        scheduledAt: z.string(),
        activities: z.array(z.object(activitySchema)),
        products: z.array(z.object(productSchema)),
      };
      z.object(schema).parse(req.body);
      next();
    } catch (err) {
      ErrorValidation.handleZodError(err, res);
    }
  };
}

const instance = new SchedulerValidation();
export { instance as SchedulerValidation };
