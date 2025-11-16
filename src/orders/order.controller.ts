import { Request, Response } from 'express';
import { OrderService } from './order.service';

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { userId, items } = req.body;
      const order = await orderService.createOrder(userId, items);
      res.status(201).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating order' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(Number(req.params.id));
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching order' });
    }
  }
}
