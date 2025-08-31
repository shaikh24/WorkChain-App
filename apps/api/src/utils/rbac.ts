import { Request, Response, NextFunction } from "express";
export function requireRole(roles: ("client"|"freelancer"|"admin")[]) {
  return (req: Request & { role?: string }, res: Response, next: NextFunction) => {
    if (!req.role || !roles.includes(req.role as any)) return res.status(403).json({ error: "forbidden" });
    next();
  };
}
