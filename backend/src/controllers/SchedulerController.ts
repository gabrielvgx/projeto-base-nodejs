import type { SchedulerCreatePayload } from '@types';
import { SchedulerService } from '@services';
import type { SchedulerWhereInput } from '../generated/prisma/models.js';

class SchedulerController {
  async create(scheduler: SchedulerCreatePayload) {
    const result = await SchedulerService.create(scheduler);
    return result;
  }
  list(filter?: SchedulerWhereInput) {
    return SchedulerService.list(filter);
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
