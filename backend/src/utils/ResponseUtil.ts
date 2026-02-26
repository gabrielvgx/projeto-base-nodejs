import type { Response } from '@types';
import { AppError } from '@error';

class ResponseUtil {
  handleSuccess(data: any, message: string = 'Success') {
    return {
      message,
      data,
    };
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
