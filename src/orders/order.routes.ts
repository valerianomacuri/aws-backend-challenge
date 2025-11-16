import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();
const controller = new OrderController();

router.post('/', controller.create.bind(controller));
router.get('/:id', controller.getById.bind(controller));

export default router;
