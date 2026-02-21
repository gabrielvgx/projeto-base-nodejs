import type { ProductCreatePayload } from '@types';
import { ProductService } from '@services';

class ProductController {
  async create(user: ProductCreatePayload) {
    const result = await ProductService.create(user);
    return result;
  }
  list() {
    return ProductService.list();
  }
  async find(id: string) {
    return ProductService.find(id);
  }
  async update(id: string, data: Partial<ProductCreatePayload>) {
    return ProductService.update(id, data);
  }
  async delete(id: string) {
    return ProductService.delete(id);
  }
}

const instance = new ProductController();
export { instance as ProductController };
