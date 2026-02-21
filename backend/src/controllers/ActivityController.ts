import { ActivityService } from '@services';
import type { ActivityCreatePayload } from '@types';

class ActivityController {
  async create(activity: ActivityCreatePayload) {
    const result = await ActivityService.create(activity);
    return result;
  }
  list() {
    return ActivityService.list();
  }
  async find(id: string) {
    return ActivityService.find(id);
  }
  async update(id: string, data: Partial<ActivityCreatePayload>) {
    return ActivityService.update(id, data);
  }
  async delete(id: string) {
    return ActivityService.delete(id);
  }
}

const instance = new ActivityController();
export { instance as ActivityController };
