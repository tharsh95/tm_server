import Feed from '../models/feed';

export const createFeed = async (req, res, next) => {
  try {
    const { url, description, createdAt } = req.body;
    const { email } = req.user;
    const feed = new Feed({ url, description, user: email, createdAt });
    await feed.save();
    res.status(201).json({ message: 'Feed successfully created' });
  } catch (error) {
    next(error); // Passes errors to the centralized error handler
  }
};

export const getFeed = async (req, res, next) => {
  try {
    const data = await Feed.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    next(error); // Passes errors to the centralized error handler
  }
};
