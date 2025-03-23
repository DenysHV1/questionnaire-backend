import Joi from 'joi';

export const createValidateScheme = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  questions: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        label: Joi.string().required(),
        type: Joi.string().valid('text', 'single', 'multiple').required(),
        options: Joi.array().items(Joi.string()).optional(),
      }),
    )
    .required(),
});

export const updateValidateScheme = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  questions: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      label: Joi.string(),
      type: Joi.string().valid('text', 'single', 'multiple'),
      options: Joi.array().items(Joi.string()).optional(),
    }),
  ),
});
