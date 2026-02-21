export type ProductCreatePayload = {
  name: string;
  description?: string;
  price?: number;
  estimatedMinPrice?: number;
  estimatedMaxPrice?: number;
};
