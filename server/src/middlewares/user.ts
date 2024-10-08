import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (user) {

        if (typeof user === 'object' && 'isAdmin' in user && user.isAdmin) {
          next();
        } else {
          return res.sendStatus(403);
        }

      } else {
        return res.sendStatus(403); // or handle the case where user is not an object with isAdmin property

      }
    });
  } else {
    return res.sendStatus(401);
  }
};
