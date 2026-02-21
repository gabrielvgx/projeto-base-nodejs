import { prisma } from '@db';
import type { ProductCreatePayload } from '@types';

class ProductService {
  async create(product: ProductCreatePayload) {
    const createdProduct = await prisma.product.create({
      data: product,
    });

    return createdProduct;
  }

  async find(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async list() {
    const products = await prisma.product.findMany();
    return products;
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: { id },
    });
  }

  async update(id: string, data: Partial<ProductCreatePayload>) {
    const dataToUpdate: Partial<ProductCreatePayload> = { ...data };
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });
    return updatedProduct;
  }
}

const instance = new ProductService();
export { instance as ProductService };
