import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";

const router = Router();
const RegisterDto = z.object({ email: z.string().email(), password: z.string().min(6), role: z.enum(["client","freelancer"]).default("client") });
router.post("/register", async (req, res) => {
  const body = RegisterDto.parse(req.body);
  const exists = await User.findOne({ email: body.email });
  if (exists) return res.status(409).json({ error: "email_taken" });
  const user = await User.create({ email: body.email, passwordHash: await bcrypt.hash(body.password, 10), role: body.role });
  res.json({ user: { _id: user._id, email: user.email, role: user.role } });
});

const LoginDto = z.object({ email: z.string().email(), password: z.string() });
router.post("/login", async (req, res) => {
  const body = LoginDto.parse(req.body);
  const user = await User.findOne({ email: body.email });
  if (!user) return res.status(401).json({ error: "invalid_credentials" });
  const ok = await (user.passwordHash && import("bcryptjs").then(b=>b.default.compare(body.password, user.passwordHash)));
  if (!ok) return res.status(401).json({ error: "invalid_credentials" });
  const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET || "dev", { subject: String(user._id), expiresIn: "7d" });
  res.json({ accessToken: token, user: { _id: user._id, email: user.email, role: user.role } });
});

export default router;
