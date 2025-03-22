import { model, Schema } from 'mongoose';

const quizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questionsCount: {
      type: Number,
      required: true,
    },
    completionsCount: {
      type: Number,
      required: false,
    },
    questions: [
      {
        id: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ['text', 'single', 'multiple'],
        },
        options: [
          {
            type: String,
            required: false,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const QuizCollection = model('quiz', quizSchema);
