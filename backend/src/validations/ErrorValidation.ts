import type { Response } from '../@types/server.js';
import z, { ZodError } from 'zod';

// type ErrorType = {
//   path: string[];
//   message: string;
// };

class ErrorValidation {
  handleZodError(err: any, res: Response) {
    if (err instanceof ZodError) {
      // const errors: ErrorType[] = [...(err as any)];
      // console.log(errors);
      res.status(400).json({
        message: 'Fail to validate parameters',
        errors: z.flattenError(err),
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new ErrorValidation();
