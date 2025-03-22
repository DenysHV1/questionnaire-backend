import {
  getAllQuiz,
  getQuizById,
  createQuiz,
  deleteQuiz,
  updateQuiz,
} from '../services/quiz.js';
import createHttpError from 'http-errors';

export const getQuizController = async (req, res, next) => {
  try {
    const quiz = await getAllQuiz();

    res.json({
      status: 200,
      message: 'Successfully found quiz!',
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuizByIdController = async (req, res, ) => {
  const { quizId } = req.params;
  const quiz = await getQuizById(quizId);
  if (!quiz) {
    throw createHttpError(404, 'Quiz not found');
  }

  res.json({
    status: 200,
    message: `Successfully found quiz with id ${quizId}!`,
    data: quiz,
  });
};

export const createQuizController = async (req, res) => {
  const quiz = await createQuiz(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a quiz!`,
    data: quiz,
  });
};

export const deleteQuizController = async (req, res, next) => {
  const { quizId } = req.params;
  const quiz = await deleteQuiz(quizId);
  if (!quiz) {
    next(createHttpError(404, 'Quiz not found'));
    return;
  }

  res.status(204).send();
};

export const updateQuizController = async (req, res, next) => {
  const { quizId } = req.params;
  const result = await updateQuiz(quizId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Quiz not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully updated a quiz!`,
    data: result.quiz,
  });
};
