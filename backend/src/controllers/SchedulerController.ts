import type { SchedulerCreatePayload } from '@types';
import { SchedulerService } from '@services';

class SchedulerController {
  async create(scheduler: SchedulerCreatePayload) {
    const result = await SchedulerService.create(scheduler);
    return result;
  }
  list() {
    return SchedulerService.list();
  }
  async find(id: string) {
    return SchedulerService.find(id);
  }
  async update(id: string, data: Partial<SchedulerCreatePayload>) {
    return SchedulerService.update(id, data);
  }
  async delete(id: string) {
    return SchedulerService.delete(id);
  }
}

const instance = new SchedulerController();
export { instance as SchedulerController };
