import z from 'zod';
import type { Request, Response, NextFunction } from '@types';
import { ErrorValidation } from './ErrorValidation.js';

class AuthValidation {
  auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const schema = {
          email: z.email(),
          password: z.string().min(6).max(255),
        };
        z.object(schema).parse(req.body);
        next();
      } catch (err) {
        ErrorValidation.handleZodError(err, res);
      }
    };
  };
}

const instance = new AuthValidation();
export { instance as AuthValidation };
