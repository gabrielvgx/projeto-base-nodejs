import { UserService } from '@services';
import type { AuthCredentials } from '@types';
import { JWT } from '@utils';

class AuthController {
  async authenticate(credentials: AuthCredentials) {
    const user = await UserService.find(credentials);
    if (user) {
      const token = JWT.generate({ user });
      return { token };
    }
    throw new Error('Invalid credentials');
  }
}

const instance = new AuthController();
export { instance as AuthController };
