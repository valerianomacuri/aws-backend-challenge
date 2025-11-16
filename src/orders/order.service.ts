import { AppDataSource } from './datasource';
import { Order } from './order.entity';

export class OrderService {
  private orderRepo = AppDataSource.getRepository(Order);

  async createOrder(
    userId: string,
    items: { productId: string; qty: number }[],
  ) {
    const order = this.orderRepo.create({
      userId,
      items,
    });
    return await this.orderRepo.save(order);
  }

  async getOrderById(id: number) {
    return await this.orderRepo.findOneBy({ id });
  }
}
