import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../auth/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Dispute } from "./dispute.model";
import { requireRole } from "../../utils/rbac";

const router = Router();
router.use(requireAuth);

router.post("/", asyncHandler(async (req, res) => {
  const Dto = z.object({ orderId: z.string(), reason: z.string().min(5) });
  const body = Dto.parse(req.body);
  const item = await Dispute.create({ ...body, raisedBy: req.userId, messages: [] });
  res.json({ item });
}));

router.post("/:id/message", asyncHandler(async (req, res) => {
  const Dto = z.object({ text: z.string().min(1) });
  const { text } = Dto.parse(req.body);
  const item = await Dispute.findByIdAndUpdate(req.params.id, { $push: { messages: { senderId: req.userId, text, createdAt: new Date() } } }, { new: true });
  res.json({ item });
}));

router.post("/:id/resolve", requireRole(["admin"]), asyncHandler(async (req, res) => {
  const Dto = z.object({ resolution: z.enum(["refund","release","split"]), split: z.object({ buyer: z.number(), seller: z.number() }).optional() });
  const { resolution, split } = Dto.parse(req.body);
  const item = await Dispute.findByIdAndUpdate(req.params.id, { resolution, split, status: "resolved", resolvedBy: req.userId }, { new: true });
  res.json({ item });
}));

export default router;
