import type { Application } from 'express';
import fs from 'node:fs';

class MiddlewareManager {
  async register(app: Application) {
    const promises: Promise<null>[] = [];
    fs.readdirSync('./src/middlewares')
      .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
      .forEach((file) => {
        promises.push(
          new Promise((resolve) => {
            import(`./middlewares/${file}`).then((middlewareModule) => {
              const middleware = middlewareModule.default;
              resolve(middleware || null);
            });
          }),
        );
      });
    return Promise.all(promises).then((middlewares) => {
      middlewares
        .sort((a: any, b: any) => {
          const priorityA = a?.priority ?? 0;
          const priorityB = b?.priority ?? 0;
          const invalidA = priorityA === undefined || priorityA === null;
          const invalidB = priorityB === undefined || priorityB === null;
          let result = 0;

          if (invalidA && invalidB) return 0;
          if (!invalidA && !invalidB) {
            if (priorityA === priorityB) return 0;
            if (priorityA < priorityB) return -1;
            return 1;
          }
          if (invalidA) return 1;
          if (invalidB) return -1;
          return result;
        })
        .forEach((middleware: any) => {
          if (middleware && typeof middleware.register === 'function') {
            middleware.register(app);
          }
        });
    });
  }
}

const instance = new MiddlewareManager();
export { instance as MiddlewareManager };
