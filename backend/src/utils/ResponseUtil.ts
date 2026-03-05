import type { Response } from '@types';
import { AppError } from '@error';

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
