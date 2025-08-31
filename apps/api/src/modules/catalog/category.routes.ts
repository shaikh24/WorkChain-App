import { Router } from "express";
import { z } from "zod";
import { Category } from "./category.model.js";
import { requireAuth } from "../../auth/requireAuth.js";
import { requireRole } from "../../utils/rbac.js";

const router = Router();

router.get("/", async (_req, res) => {
  const items = await Category.find().sort({ name: 1 });
  res.json({ items });
});

router.use(requireAuth, requireRole(["admin"]));

const Dto = z.object({ name: z.string().min(2), slug: z.string().min(2) });
router.post("/", async (req, res) => {
  const body = Dto.parse(req.body);
  const item = await Category.create(body);
  res.json({ item });
});

export default router;
