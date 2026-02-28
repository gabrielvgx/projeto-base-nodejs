import './utils/Env.js';
import express from 'express';
// import { Router } from './Router.js';
// import { MiddlewareManager } from './MiddlewareManager.js';
// import { Logger } from '@logger';
// import { Env, HttpCode, ResponseUtil } from '@utils';
import { Env } from '@utils';
// import { AppError } from '@error';
// import type { Request, Response, NextFunction } from '@types';

const app = express();
const PORT = 3000;
// const logger = new Logger('Server');

app.get('/', (_req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p>
        <img src="/logo.png" alt="Logo" width="120" />
      </body>
    </html>
  `)
})

// const notFoundHandler = (req: Request, res: Response) => {
//   logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
//   return ResponseUtil.handleError(
//     res,
//     new AppError('Rota não encontrada', HttpCode.NOT_FOUND, {
//       path: req.originalUrl,
//       method: req.method,
//     }),
//   );
// };

// const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
//   const errorMessage = err.message || 'Erro interno do servidor';
//   const statusCode =
//     err instanceof AppError ? err.statusCode : HttpCode.INTERNAL_SERVER_ERROR;
//   const errorData = {
//     path: req.path,
//     method: req.method,
//     timestamp: new Date().toISOString(),
//     ...(err instanceof AppError ? { statusCode: err.statusCode, data: err.data } : {}),
//   };
//   logger.error(`${req.method} ${req.path}: ${errorMessage}`);

//   return ResponseUtil.handleError(res, new AppError(errorMessage, statusCode, errorData));
// };

// MiddlewareManager.register(app);
// Router.register(app).then(() => {
//   app.use(notFoundHandler);
//   app.use(errorHandler);
// });

if (Env.isDevelopment()) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
