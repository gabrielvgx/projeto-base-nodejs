import dotenv from 'dotenv';
import path from 'node:path';

const backendPath = path.dirname(path.join(process.argv[1] || '', '..'));

class Env {
  constructor() {
    dotenv.config({ path: path.join(backendPath, '.env') });
  }

  get(key: string, defaultValue: string | null = null): string {
    const value = process.env[key];
    return value !== undefined ? value : defaultValue || '';
  }

  isDevelopment(): boolean {
    return this.get('NODE_ENV') === 'development';
  }

  isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }
}

const instance = new Env();
export { instance as Env };
