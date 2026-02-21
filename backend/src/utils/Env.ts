import dotenv from 'dotenv';
import path from 'node:path';

const backendPath = path.dirname(path.join(process.argv[1] || '', '..'));

class Env {
  constructor() {
    dotenv.config({ path: path.join(backendPath, '.env') });
  }
}

const instance = new Env();
export { instance as Env };
