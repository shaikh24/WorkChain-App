import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../auth/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Review } from "./review.model";

const router = Router();
router.use(requireAuth);

const Dto = z.object({ orderId: z.string(), revieweeId: z.string(), rating: z.number().min(1).max(5), text: z.string().optional() });

router.post("/", asyncHandler(async (req, res) => {
  const body = Dto.parse(req.body);
  const item = await Review.create({ ...body, reviewerId: req.userId });
  res.json({ item });
}));

router.get("/for/:userId", asyncHandler(async (req, res) => {
  const items = await Review.find({ revieweeId: req.params.userId }).sort({ createdAt: -1 });
  res.json({ items });
}));

export default router;
