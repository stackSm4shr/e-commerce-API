import type { RequestHandler } from "express";
import { Order, Product, User } from "#models";
import { z } from "zod";
import type { orderInputSchema } from "#schemas";

type OrderInputDTO = z.infer<typeof orderInputSchema>;

/* ---------- CREATE ---------- */
export const createOrder: RequestHandler<unknown, any, OrderInputDTO> = async (
  req,
  res
) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new Error("Unauthorized", { cause: { status: 401 } });
  }

  // user exists?
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  const { products } = req.body;

  // product IDs?
  const productIds = products.map((p) => p.productId);

  // products exist?
  const dbProducts = await Product.find({ _id: { $in: productIds } });

  if (dbProducts.length !== products.length) {
    throw new Error("One or more products do not exist", {
      cause: { status: 400 },
    });
  }

  let total = 0;
  // map through products and calculate item total and order total
  const orderProducts = products.map((item) => {
    const product = dbProducts.find(
      (p) => p._id.toString() === item.productId
    )!;

    const productTotal = product.price * item.quantity;
    total += productTotal;

    return {
      product: product._id,
      quantity: item.quantity,
      total: productTotal,
    };
  });

  const order = await Order.create({
    user: userId,
    products: orderProducts,
    total,
  });

  res.status(201).json(order);
};

/* ---------- READ ALL ---------- */
export const getAllOrders: RequestHandler = async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "firstName lastName email")
    .populate("products.product", "title price image_url");

  if (!orders.length) {
    throw new Error("No orders found", { cause: { status: 404 } });
  }

  res.status(200).json(orders);
};

/* ---------- READ ONE ---------- */
export const getOrderById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("user", "firstName lastName email")
    .populate("products.product", "title price image_url");

  if (!order) {
    throw new Error("Order not found", { cause: { status: 404 } });
  }

  res.status(200).json(order);
};

/* ---------- UPDATE ---------- */
export const updateOrder: RequestHandler<
  { id: string },
  any,
  OrderInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const productIds = products.map((p) => p.productId);
  const dbProducts = await Product.find({ _id: { $in: productIds } });

  if (dbProducts.length !== products.length) {
    throw new Error("One or more products do not exist", {
      cause: { status: 400 },
    });
  }

  let total = 0;

  const orderProducts = products.map((item) => {
    const product = dbProducts.find(
      (p) => p._id.toString() === item.productId
    )!;

    const productTotal = product.price * item.quantity;
    total += productTotal;

    return {
      product: product._id,
      quantity: item.quantity,
      total: productTotal,
    };
  });

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      products: orderProducts,
      total,
    },
    { new: true, runValidators: true }
  )
    .populate("user", "firstName lastName email")
    .populate("products.product", "title price");

  if (!updatedOrder) {
    throw new Error("Order not found", { cause: { status: 404 } });
  }

  res.status(200).json({
    message: "Order updated successfully",
    order: updatedOrder,
  });
};

/* ---------- DELETE ---------- */
export const deleteOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) {
    throw new Error("Order not found", { cause: { status: 404 } });
  }

  res.status(200).json({
    message: `Order with id:${id} was deleted`,
  });
};
