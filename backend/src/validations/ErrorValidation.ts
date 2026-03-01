import type { Response } from '@types';
import { AppError } from '@error';
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
    } else if (err instanceof AppError) {
      res.status(err.statusCode).json({
        message: err.message,
        data: err.data,
      });
    } else {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const instance = new ErrorValidation();
export { instance as ErrorValidation };
