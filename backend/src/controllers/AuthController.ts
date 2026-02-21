import UserService from '@services/UserService.js';
import type { AuthCredentials } from '../@types/auth.js';
import JWT from '@utils/JWT.js';

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

export default new AuthController();
