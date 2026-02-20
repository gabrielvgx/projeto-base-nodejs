import UserService from '@services/UserService.js';
import type { UserCreatePayload } from '../@types/user.js';

class UserController {
  async create(user: UserCreatePayload) {
    const result = await UserService.create(user);
    return result;
  }
  list() {
    return UserService.list();
  }
  update() {}
  delete() {}
}

export default new UserController();
