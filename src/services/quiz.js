import { QuizCollection } from '../db/models/quiz.js';
import { Types } from 'mongoose';

export const getAllQuiz = async () => {
  const quiz = await QuizCollection.find();
  return quiz;
};

export const getQuizById = async (quizId) => {
  const isValidId = Types.ObjectId.isValid(quizId);
  if (!isValidId) {
    return undefined;
  }
  const quiz = await QuizCollection.findById(quizId);
  return quiz;
};

export const createQuiz = async (payload) => {
  console.log(payload);

  const quiz = await QuizCollection.create({...payload, questionsCount: payload.questions.length});
  return quiz;
};

export const deleteQuiz = async (quizId) => {
  const quiz = await QuizCollection.findOneAndDelete({
    _id: quizId,
  });
  return quiz;
};

export const updateQuiz = async (quizId, payload, options = {}) => {
  const rawResult = await QuizCollection.findOneAndUpdate(
    { _id: quizId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    quiz: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
