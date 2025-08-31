import { Router } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import { requireAuth } from "../../auth/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Order } from "./order.model";
import { Transaction } from "./transaction.model";
import { getPiAdapter } from "../../payments/pi.adapter";

const router = Router();
router.use(requireAuth);

router.get("/", asyncHandler(async (req, res) => {
  const orders = await Order.find({ $or: [{ buyerId: req.userId }, { sellerId: req.userId }] }).sort({ createdAt: -1 });
  res.json({ items: orders });
}));

const CreateDto = z.object({
  sellerId: z.string(),
  source: z.enum(["gig","job"]),
  gigId: z.string().optional(),
  totalAmountPi: z.number().positive(),
  milestones: z.array(z.object({
    title: z.string().min(2),
    amountPi: z.number().positive()
  })).min(1)
});

router.post("/", asyncHandler(async (req, res) => {
  const body = CreateDto.parse(req.body);
  const order = await Order.create({
    buyerId: new mongoose.Types.ObjectId(req.userId),
    sellerId: new mongoose.Types.ObjectId(body.sellerId),
    source: body.source,
    gigId: body.gigId ? new mongoose.Types.ObjectId(body.gigId) : undefined,
    totalAmountPi: body.totalAmountPi,
    milestones: body.milestones.map(m=>({ ...m, status: "pending" }))
  });
  res.json({ item: order });
}));

router.post("/:id/fund", asyncHandler(async (req, res) => {
  const { milestoneIndex = 0 } = req.body ?? {};
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "not_found" });
  if (String(order.buyerId) !== req.userId) return res.status(403).json({ error: "forbidden" });
  const ms = order.milestones[milestoneIndex];
  if (!ms) return res.status(400).json({ error: "invalid_milestone" });

  const pi = getPiAdapter();
  const intent = await pi.createPayment({ amountPi: ms.amountPi, metadata: { orderId: order._id, milestoneIndex } });
  await pi.approvePayment(intent.id);
  ms.escrowPaymentId = intent.id;
  ms.status = "funded";
  order.escrowStatus = "held";
  await order.save();
  await Transaction.create({ type: "fund", amountPi: ms.amountPi, orderId: order._id, milestoneId: ms._id, piPaymentId: intent.id, status: "succeeded" });
  res.json({ item: order, payment: intent });
}));

router.post("/:id/release", asyncHandler(async (req, res) => {
  const { milestoneIndex = 0 } = req.body ?? {};
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "not_found" });
  // either buyer accepts or admin resolves; keep simple
  const ms = order.milestones[milestoneIndex];
  if (!ms?.escrowPaymentId) return res.status(400).json({ error: "not_funded" });
  const pi = getPiAdapter();
  await pi.completePayment(ms.escrowPaymentId);
  ms.status = "released";
  ms.releasedAt = new Date();
  order.escrowStatus = "released";
  order.status = "completed";
  await order.save();
  await Transaction.create({ type: "release", amountPi: ms.amountPi, orderId: order._id, milestoneId: ms._id, piPaymentId: ms.escrowPaymentId, status: "succeeded" });
  res.json({ item: order });
}));

router.post("/:id/refund", asyncHandler(async (req, res) => {
  const { milestoneIndex = 0 } = req.body ?? {};
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "not_found" });
  const ms = order.milestones[milestoneIndex];
  if (!ms?.escrowPaymentId) return res.status(400).json({ error: "not_funded" });
  const pi = getPiAdapter();
  await pi.cancelPayment(ms.escrowPaymentId);
  ms.status = "refunded";
  order.escrowStatus = "refunded";
  order.status = "canceled";
  await order.save();
  await Transaction.create({ type: "refund", amountPi: ms.amountPi, orderId: order._id, milestoneId: ms._id, piPaymentId: ms.escrowPaymentId, status: "succeeded" });
  res.json({ item: order });
}));

export default router;
