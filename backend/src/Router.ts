import type { Application } from '@types';
import fs from 'node:fs';
class Router {
  register(app: Application) {
    fs.readdirSync('./src/routes')
      .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
      .forEach((file) => {
        import(`./routes/${file}`).then((routeModule) => {
          const route = routeModule.default;
          route.register(app);
        });
      });
  }
}

const instance = new Router();
export { instance as Router };
