import z from 'zod';
import type { Request, Response, NextFunction } from '@types';
import { ErrorValidation } from './ErrorValidation.js';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

class UserValidation {
  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = {
        email: z.email(),
        name: z.string().min(5).max(255),
        role: z.enum(UserRole),
        password: z.string().min(6).max(255),
      };
      z.object(schema).parse(req.body);
      next();
    } catch (err) {
      ErrorValidation.handleZodError(err, res);
    }
  };
}

const instance = new UserValidation();
export { instance as UserValidation };
