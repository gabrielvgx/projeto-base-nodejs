import type { Activity } from './activity.js';
import type { Product } from './product.js';

export type ProductItem = {
  id: Product['id'];
  quantity: number;
};

export type ActivityItem = {
  id: Activity['id'];
};

export type SchedulerCreatePayload = {
  customerId: string;
  professionalId?: string;
  scheduledAt: string;
  activities: ActivityItem[];
  products: ProductItem[];
};
