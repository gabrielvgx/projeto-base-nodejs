import { UserService } from '@services';
import type { UserCreatePayload } from '@types';
import type { User } from '../generated/prisma/client.js';

class UserController {
  async create(user: UserCreatePayload) {
    const result = await UserService.create(user);
    return result;
  }
  list() {
    return UserService.list();
  }
  async find(params: Partial<User>) {
    return UserService.find(params);
  }
  async update(id: string, data: Partial<UserCreatePayload>) {
    return UserService.update(id, data);
  }
  async delete(id: string) {
    return UserService.delete(id);
  }
}

const instance = new UserController();
export { instance as UserController };
