import z from 'zod';
import type { Request, Response, NextFunction } from '../@types/server.js';
import ErrorValidation from './ErrorValidation.js';

class UserValidation {
  create = (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = {
        email: z.email(),
        name: z.string().min(5).max(255),
        role: z.enum(['admin', 'user']),
        password: z.string().min(6).max(255),
      };
      z.object(schema).parse(req.body);
      next();
    } catch (err) {
      ErrorValidation.handleZodError(err, res);
    }
  };
}

export default new UserValidation();
