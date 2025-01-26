import { NextFunction, Request, Response } from 'express';
import Feed from '../models/feed';

interface CustomRequest extends Request {
  user?: {
    email: string;
  };
}

export const createFeed: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void> = async (
  req,
  res,
  next
) => {
  try {
    const { url, description, createdAt } = req.body;
    if (!req.user) {
      res.status(400).json({ message: 'User not authenticated' });
      return; // Ensure the function ends here
    }
    const { email } = req.user;
    const feed = new Feed({ url, description, user: email, createdAt });
    await feed.save();
    res.status(201).json({ message: 'Feed successfully created' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

export const getFeed: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (
  req,
  res,
  next
) => {
  try {
    const data = await Feed.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
