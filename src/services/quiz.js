import { QuizCollection } from '../db/models/quiz.js';

export const getAllQuiz = async () => await QuizCollection.find();

export const getQuizById = async (quizId) =>
  await QuizCollection.findById(quizId);

export const createQuiz = async (payload) =>
  await QuizCollection.create({ ...payload });

export const deleteQuiz = async (quizId) =>
  await QuizCollection.findOneAndDelete({ _id: quizId });

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
