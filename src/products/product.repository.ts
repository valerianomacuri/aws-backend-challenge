import { ProductModel } from './product.model';

export class ProductsRepository {
  async findAll() {
    return ProductModel.scan().exec();
  }

  async findById(id: string) {
    return ProductModel.get(id);
  }

  async create(data: any) {
    const product = new ProductModel(data);
    return product.save();
  }

  async update(id: string, data: any) {
    return ProductModel.update({ id }, data);
  }

  async delete(id: string) {
    return ProductModel.delete(id);
  }
}
