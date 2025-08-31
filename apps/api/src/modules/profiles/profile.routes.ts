import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../auth/requireAuth.js";
import { Profile } from "./profile.model.js";

const router = Router();
router.use(requireAuth);

router.get("/me", async (req: any, res) => {
  let p = await Profile.findOne({ userId: req.userId });
  if (!p) p = await Profile.create({ userId: req.userId, skills: [], languages: [], badges: [] });
  res.json({ item: p });
});

const UpdateDto = z.object({
  displayName: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  hourlyRate: z.number().optional()
});

router.put("/me", async (req: any, res) => {
  const body = UpdateDto.parse(req.body);
  const p = await Profile.findOneAndUpdate({ userId: req.userId }, { $set: body }, { new: true, upsert: true });
  res.json({ item: p });
});

export default router;
