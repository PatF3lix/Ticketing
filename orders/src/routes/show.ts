import express, { Request, Response } from "express";
import { NotAuthorizedError, requireAuth } from "@microserviceticket/common";
import { Order, OrderStatus } from "../models/order";
import { NotFoundError } from "@microserviceticket/common";

const router = express.Router();

router.get("/api/orders/:orderId", async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate("ticket");
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.send(order);
});

export { router as showOrderRouter };
