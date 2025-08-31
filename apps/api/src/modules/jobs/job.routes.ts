import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../auth/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "./job.model";
import { Proposal } from "./proposal.model";

const router = Router();

router.get("/", asyncHandler(async (req, res) => {
  const q = (req.query.q as string) || "";
  const items = await Job.find(q ? { $text: { $search: q } } : {}).limit(50).sort({ createdAt: -1 });
  res.json({ items });
}));

router.use(requireAuth);

const JobDto = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  budgetType: z.enum(["fixed","hourly"]),
  budgetRange: z.object({ min: z.number().optional(), max: z.number().optional() }).optional()
});

router.post("/", asyncHandler(async (req, res) => {
  const body = JobDto.parse(req.body);
  const doc = await Job.create({ ...body, clientId: req.userId, attachments: [] });
  res.json({ item: doc });
}));

router.post("/:id/proposals", asyncHandler(async (req, res) => {
  const Dto = z.object({
    cover: z.string().min(5),
    bidAmount: z.number().positive(),
    milestones: z.array(z.object({ title: z.string().min(2), amountPi: z.number().positive() })).min(1),
    attachments: z.array(z.string()).default([])
  });
  const body = Dto.parse(req.body);
  const prop = await Proposal.create({ ...body, jobId: req.params.id, freelancerId: req.userId });
  res.json({ item: prop });
}));

router.post("/:jobId/proposals/:proposalId/accept", asyncHandler(async (req, res) => {
  const prop = await Proposal.findByIdAndUpdate(req.params.proposalId, { status: "accepted" }, { new: true });
  res.json({ item: prop });
}));

export default router;
