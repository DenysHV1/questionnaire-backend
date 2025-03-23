import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { quizId } = req.params;

  if (!isValidObjectId(quizId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
