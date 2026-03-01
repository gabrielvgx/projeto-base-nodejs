import type { SchedulerCreatePayload } from '@types';
import { prisma } from '@db';
import { ProductService } from './ProductService.js';
import { BookingLeadTimeHelper } from '@helper';
import { AppError } from '@error';
import { HttpCode } from '@utils';

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
    const { customerId, products, scheduledAt } = scheduler;
    const productsList = await this.getProductsList(products);
    const invalidItems = this.isValidItemsByLeadTime(new Date(scheduledAt), productsList);
    if (invalidItems.length > 0) {
      throw new AppError(
        `Some items do not meet the booking lead time requirements`,
        HttpCode.BAD_REQUEST,
        {
          invalidItems: invalidItems.map((item) => ({
            id: 'id' in item ? item.id : null,
            name: 'name' in item ? item.name : null,
            bookingLeadTimeMinutes: item.bookingLeadTimeMinutes,
            bookingLeadDays: item.bookingLeadDays,
          })),
        },
      );
    }
    const schedulerItems = [
      ...productsList.map((product, orderIndex) => ({
        productId: product.id,
        quantity: product.quantity,
        priceAtBooking: product.price || null,
        orderIndex: orderIndex + 1,
      })),
    ];
    const createdScheduler = await prisma.scheduler.create({
      data: {
        customerId: customerId,
        status: 'pending',
        scheduledAt: new Date(scheduledAt),
        items: {
          create: schedulerItems,
        },
      },
      omit: {
        customerId: true,
      },
      include: {
        customer: {
          select: userSelect,
        },
        items: {
          include: {
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
      },
      omit: {
        customerId: true,
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
      },
    });
    return updatedScheduler;
  }
}

const instance = new SchedulerService();
export { instance as SchedulerService };
