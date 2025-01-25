
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Express Request type to include `user`
declare module 'express' {
  export interface Request {
    user?: string | JwtPayload;
  }
}

// Middleware to validate JWT and attach user info to the request object
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
     res.status(401).json({ message: 'Access denied. No token provided.' });
     return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach decoded token payload to `req.user`
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};