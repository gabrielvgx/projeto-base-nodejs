import type { Response } from '@types';
import { AppError } from '@error';
import { Prisma } from 'generated/prisma/client.js';
import { PrismaError } from './PrismaError.js';

type SuccessResponse = {
  statusCode?: number;
  message?: string;
  data?: Record<string, any>;
};

class ResponseUtil {
  handleSuccess(res: Response, responseData: SuccessResponse = {}) {
    const { statusCode = 200, message = 'Success', data = {} } = responseData;
    res.status(statusCode).send({ message, data });
  }

  handleError(res: Response, err: unknown) {
    if (err instanceof AppError) {
      if (err.originalError instanceof Prisma.PrismaClientKnownRequestError) {
        const customError = PrismaError.get(err.originalError.code, {
          resource: err.originalError.meta?.modelName,
        });
        if (customError) {
          res.status(customError.responseStatus).json({
            message: customError.message,
            errors: {
              orm: {
                cause: err.originalError.cause,
                originalMessage: err.originalError.message,
                meta: err.originalError.meta,
              },
            },
          });
          return;
        }
      }
      res.status(err.statusCode).json({
        message: err.message,
        data: err.data || null,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        data: null,
      });
    }
  }
}

const instance = new ResponseUtil();
export { instance as ResponseUtil };
