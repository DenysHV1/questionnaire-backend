import { Router } from 'express';

import {ctrlWrapper} from '../utils/ctrlWrapper.js'
import { createQuizController, deleteQuizController, getQuizByIdController, getQuizController, updateQuizController } from '../controllers/quiz.js';
import {validateBody} from '../middlewares/validateBody.js'
import { createValidateScheme, updateValidateScheme } from '../validation/quiz.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/quiz', ctrlWrapper(getQuizController));
router.get('/quiz/:quizId', isValidId, ctrlWrapper(getQuizByIdController));
router.post('/quiz', validateBody(createValidateScheme), ctrlWrapper(createQuizController));
router.delete('/quiz/:quizId', isValidId, ctrlWrapper(deleteQuizController));
router.put('/quiz/:quizId', isValidId, validateBody(updateValidateScheme), ctrlWrapper(updateQuizController));

export default router;
