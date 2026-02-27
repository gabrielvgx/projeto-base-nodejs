import type { SchedulerCreatePayload } from '@types';
import { prisma } from '@db';
import { ProductService } from './ProductService.js';
import { ActivityService } from './ActivityService.js';
import { BookingLeadTimeHelper } from 'helper/BookingLeadTimeHelper.js';
import { AppError } from 'error/AppError.js';
import { HttpCode } from 'utils/HttpCode.js';

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
          throw new AppError(
            `Product with id ${product.id} not found`,
            HttpCode.NOT_FOUND,
          );
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
          throw new AppError(
            `Activity with id ${activity.id} not found`,
            HttpCode.NOT_FOUND,
          );
        }
        return result;
      }),
    );
  }
  isValidItemsByLeadTime(
    scheduledAt: Date,
    schedulerItems: {
      bookingLeadTimeMinutes?: number | undefined;
      bookingLeadDays?: number | undefined;
    }[],
  ) {
    const invalidItems = schedulerItems.filter((item) => {
      return !BookingLeadTimeHelper.isValidLeadTime(scheduledAt, {
        leadTimeInMinutes: item.bookingLeadTimeMinutes,
        leadTimeInDays: item.bookingLeadDays,
      });
    });
    return invalidItems;
  }
  async create(scheduler: SchedulerCreatePayload) {
    const { customerId, professionalId, activities, products, scheduledAt } = scheduler;
    if (customerId === professionalId) {
      throw new AppError(
        'Customer and professional cannot be the same user',
        HttpCode.BAD_REQUEST,
      );
    }
    const activitiesList = await this.getActivitiesList(activities);
    const productsList = await this.getProductsList(products);
    const items = [...activitiesList, ...productsList];
    const invalidItems = this.isValidItemsByLeadTime(new Date(scheduledAt), items);
    if (invalidItems.length > 0) {
      throw new AppError(
        `Some items do not meet the booking lead time requirements`,
        HttpCode.BAD_REQUEST,
        {
          invalidItems: invalidItems.map((item) => ({
            id: 'id' in item ? item.id : null,
            name: 'name' in item ? item.name : null,
            type: 'estimatedDurationMinutes' in item ? 'activity' : 'product',
            bookingLeadTimeMinutes: item.bookingLeadTimeMinutes,
            bookingLeadDays: item.bookingLeadDays,
          })),
        },
      );
    }
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
