import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export function requireAuth(req: Request & { userId?: string, role?: string }, res: Response, next: NextFunction){
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "unauthorized" });
  const token = auth.replace(/^Bearer\s+/i, "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev") as any;
    req.userId = payload.sub;
    req.role = payload.role;
    next();
  } catch {
    return res.status(401).json({ error: "invalid_token" });
  }
}
