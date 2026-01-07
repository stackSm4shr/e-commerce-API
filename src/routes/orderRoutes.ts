import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from '#controllers';
import { authenticate, authorize, validateBodyZod } from '#middlewares';
import { orderInputSchema } from '#schemas';
import { Order } from '#models';

const orderRoutes = Router();

/* ---------- PUBLIC ---------- */
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', getOrderById);

/* ---------- CREATE ---------- */
orderRoutes.post(
  '/',
  authenticate,
  validateBodyZod(orderInputSchema),
  createOrder
);

/* ---------- UPDATE ---------- */
orderRoutes.put(
  '/:id',
  authenticate,
  authorize(Order),
  validateBodyZod(orderInputSchema),
  updateOrder
);

/* ---------- DELETE ---------- */
orderRoutes.delete(
  '/:id',
  authenticate,
  authorize(Order),
  deleteOrder
);

export default orderRoutes;
