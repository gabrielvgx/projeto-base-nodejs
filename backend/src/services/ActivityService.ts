import { prisma } from '@db';
import type { ActivityCreatePayload } from '@types';

class ActivityService {
  async create(activity: ActivityCreatePayload) {
    const createdActivity = await prisma.activity.create({
      data: activity,
    });

    return createdActivity;
  }

  async find(id: string) {
    const activity = await prisma.activity.findUnique({
      where: { id },
    });
    return activity;
  }

  async list() {
    const activities = await prisma.activity.findMany();
    return activities;
  }

  async delete(id: string) {
    await prisma.activity.delete({
      where: { id },
    });
  }

  async update(id: string, data: Partial<ActivityCreatePayload>) {
    const dataToUpdate: Partial<ActivityCreatePayload> = { ...data };

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: dataToUpdate,
    });
    return updatedActivity;
  }
}

const instance = new ActivityService();
export { instance as ActivityService };
