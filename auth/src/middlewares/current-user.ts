import { NextFunction, Request, Response } from "express";
import { JwtManager } from "../services/jwt";

interface usrePayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: usrePayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();
  try {
    const payload = JwtManager.verifyToken(req.session.jwt) as usrePayload
    req.currentUser = payload;
  } catch (err) {}

  next();
};
