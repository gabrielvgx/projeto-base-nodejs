import z from 'zod';
import type { Request, Response, NextFunction } from '@types';
import { ErrorValidation } from './ErrorValidation.js';
import { AppError } from 'error/AppError.js';
import { HttpCode } from 'utils/HttpCode.js';

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
      const { activities = [], products = [] } = req.body;
      if (activities.length === 0 && products.length === 0) {
        throw new AppError(
          'At least one activity or product must be provided',
          HttpCode.BAD_REQUEST,
        );
      }
      next();
    } catch (err) {
      ErrorValidation.handleZodError(err, res);
    }
  };
}

const instance = new SchedulerValidation();
export { instance as SchedulerValidation };
