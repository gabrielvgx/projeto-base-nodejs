export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  estimatedMinPrice?: number;
  estimatedMaxPrice?: number;
};

export type ProductCreatePayload = Omit<Product, 'id'>;
