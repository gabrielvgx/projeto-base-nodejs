import type { SchedulerCreatePayload } from '@types';
import { prisma } from '@db';
import { ProductService } from './ProductService.js';
import { ActivityService } from './ActivityService.js';

const userSelect = {
  id: true,
  name: true,
};

class SchedulerService {
  private async getProductsList(products: SchedulerCreatePayload['products']) {
    return Promise.all(
      products.map(async (product) => {
        const result = await ProductService.find(product.id);
        if (!result) {
          throw new Error(`Product with id ${product.id} not found`);
        }
        return { ...result, quantity: product.quantity };
      }),
    );
  }
  private async getActivitiesList(activities: SchedulerCreatePayload['activities']) {
    return Promise.all(
      activities.map(async (activity) => {
        const result = await ActivityService.find(activity.id);
        if (!result) {
          throw new Error(`Activity with id ${activity.id} not found`);
        }
        return result;
      }),
    );
  }
  async create(scheduler: SchedulerCreatePayload) {
    const { customerId, professionalId, activities, products, scheduledAt } = scheduler;
    const activitiesList = await this.getActivitiesList(activities);
    const productsList = await this.getProductsList(products);
    const schedulerItems = [
      ...activitiesList.map((activity, orderIndex) => ({
        productId: null,
        activityId: activity.id,
        priceAtBooking: activity.estimatedPrice || null,
        durationMinutes: activity.estimatedDurationMinutes,
        orderIndex: orderIndex + 1,
      })),
      ...productsList.map((product, orderIndex) => ({
        activityId: null,
        productId: product.id,
        quantity: product.quantity,
        priceAtBooking: product.price || null,
        orderIndex: orderIndex + 1,
      })),
    ];
    const createdScheduler = await prisma.scheduler.create({
      data: {
        customerId: customerId,
        professionalId: professionalId ?? null,
        status: 'pending',
        scheduledAt: new Date(scheduledAt),
        items: {
          create: schedulerItems,
        },
      },
      omit: {
        customerId: true,
        professionalId: true,
      },
      include: {
        professional: {
          select: userSelect,
        },
        customer: {
          select: userSelect,
        },
        items: {
          include: {
            activity: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                estimatedMinPrice: true,
                estimatedMaxPrice: true,
              },
            },
          },
          omit: {
            productId: true,
            activityId: true,
            schedulerId: true,
          },
        },
      },
    });

    return createdScheduler;
  }

  async find(id: string) {
    const scheduler = await prisma.scheduler.findUnique({
      where: { id },
      include: {
        items: true,
        customer: {
          select: userSelect,
        },
        professional: {
          select: userSelect,
        },
      },
    });
    return scheduler;
  }

  async list() {
    const schedulers = await prisma.scheduler.findMany({
      include: {
        items: {
          select: {
            orderIndex: true,
            priceAtBooking: true,
            durationMinutes: true,
            activity: {
              select: {
                id: true,
                name: true,
                description: true,
                estimatedPrice: true,
                estimatedDurationMinutes: true,
              },
            },
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                estimatedMinPrice: true,
                estimatedMaxPrice: true,
              },
            },
          },
        },
        customer: {
          select: userSelect,
        },
        professional: {
          select: userSelect,
        },
      },
      omit: {
        customerId: true,
        professionalId: true,
      },
    });
    return schedulers;
  }

  async delete(id: string) {
    await prisma.scheduler.delete({
      where: { id },
    });
  }

  async update(id: string, data: Partial<SchedulerCreatePayload>) {
    const dataToUpdate: Partial<SchedulerCreatePayload> = { ...data };

    const updatedScheduler = await prisma.scheduler.update({
      where: { id },
      data: dataToUpdate,
      include: {
        customer: {
          select: userSelect,
        },
        professional: {
          select: userSelect,
        },
      },
    });
    return updatedScheduler;
  }
}

const instance = new SchedulerService();
export { instance as SchedulerService };
