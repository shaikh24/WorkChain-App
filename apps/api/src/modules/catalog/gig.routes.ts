import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../auth/requireAuth.js";
import { Gig } from "./gig.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const q = (req.query.q as string) || "";
  const items = await (q ? Gig.find({ $text: { $search: q } }) : Gig.find()).limit(50);
  res.json({ items });
});

router.use(requireAuth);

const Dto = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  packages: z.array(z.object({ name: z.string(), pricePi: z.number(), deliveryDays: z.number(), revisions: z.number() })).min(1),
  tags: z.array(z.string()).default([]),
  categoryId: z.string().optional()
});

router.post("/", async (req: any, res) => {
  const body = Dto.parse(req.body);
  const item = await Gig.create({ ...body, userId: req.userId });
  res.json({ item });
});

export default router;
