import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface userPayload {
  id: string;
  email: string;
}

//This is how we can reach into an existing type definition and make a modification to it.
//This is here to help typescript on line 32
declare global {
  namespace Express {
    interface Request {
      currentUser: userPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
