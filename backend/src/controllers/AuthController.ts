import { UserService } from '@services';
import type { AuthCredentials } from '@types';
import { HttpCode, JWT } from '@utils';
import { AppError } from '@error';

class AuthController {
  async authenticate(credentials: AuthCredentials) {
    const user = await UserService.find(credentials);
    if (user) {
      const token = JWT.generate({ user });
      return { token };
    }
    throw new AppError('Invalid credentials', HttpCode.UNAUTHORIZED);
  }
}

const instance = new AuthController();
export { instance as AuthController };
