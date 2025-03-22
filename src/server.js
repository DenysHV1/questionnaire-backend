import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import quizRouter from './routers/quiz.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const setupServer = () => {
  const app = express();
  dotenv.config();
  const PORT = Number(process.env.PORT);

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(quizRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
