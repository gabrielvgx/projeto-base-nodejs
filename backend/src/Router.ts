import type { Application } from '@types';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Router {
  async register(app: Application) {
    // na build os ficheiros são .js, no dev são .ts
    const ext = path.extname(__filename); // ".ts" ou ".js"
    const routesDir = path.join(__dirname, 'routes');

    const files = fs
      .readdirSync(routesDir)
      .filter((f) => f !== `index${ext}` && f.endsWith(ext));

    const loaders = files.map(async (file) => {
      const modulePath = path.join(routesDir, file);

      const routeModule = await import(modulePath);
      const route = routeModule.default;
      route.register(app);
    });

    await Promise.all(loaders);
  }
}

export const router = new Router();
export default router;
export { router as Router };
/*
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
*/
