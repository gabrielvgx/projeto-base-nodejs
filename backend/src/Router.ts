import type { Application } from '@types';
import fs from 'node:fs';
class Router {
  async register(app: Application) {
    const promises: Promise<null>[] = [];
    fs.readdirSync('./src/routes')
      .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
      .forEach((file) => {
        promises.push(
          new Promise((resolve) => {
            import(`./routes/${file}`).then((routeModule) => {
              const route = routeModule.default;
              route.register(app);
              resolve(null);
            });
          }),
        );
      });
    return Promise.all(promises);
  }
}

const instance = new Router();
export { instance as Router };
