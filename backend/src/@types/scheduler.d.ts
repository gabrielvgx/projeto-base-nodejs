import type { Product } from './product.js';

export type ProductItem = {
  id: Product['id'];
  quantity: number;
};

export type SchedulerCreatePayload = {
  customerId: string;
  scheduledAt: string;
  products: ProductItem[];
};

export type LeadTimeConfig = {
  leadTimeInMinutes?: number | undefined;
  leadTimeInDays?: number | undefined;
};
