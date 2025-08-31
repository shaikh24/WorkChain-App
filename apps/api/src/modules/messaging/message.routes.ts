import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../auth/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Message } from "./message.model";

const router = Router();
router.use(requireAuth);

router.get("/:roomId", asyncHandler(async (req, res) => {
  const items = await Message.find({ roomId: req.params.roomId }).sort({ createdAt: 1 }).limit(200);
  res.json({ items });
}));

const SendDto = z.object({ text: z.string().min(1).optional(), files: z.array(z.string()).default([]) });

router.post("/:roomId", asyncHandler(async (req, res) => {
  const { text, files } = SendDto.parse(req.body);
  const msg = await Message.create({ roomId: req.params.roomId, senderId: req.userId, text, files });
  res.json({ item: msg });
}));

export default router;
