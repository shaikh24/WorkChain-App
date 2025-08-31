import { Router } from "express";
import { requireAuth } from "../../auth/requireAuth";
import { requireRole } from "../../utils/rbac";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../users/user.model";
import { Order } from "../orders/order.model";
import { Dispute } from "../disputes/dispute.model";

const router = Router();
router.use(requireAuth, requireRole(["admin"]));

router.get("/metrics", asyncHandler(async (_req, res) => {
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const disputesOpen = await Dispute.countDocuments({ status: "open" });
  res.json({ users, orders, disputesOpen });
}));

router.post("/users/:id/ban", asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: "banned" }, { new: true });
  res.json({ user });
}));

export default router;
