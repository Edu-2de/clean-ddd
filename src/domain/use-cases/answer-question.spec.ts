import { expect, it, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question.js';

it('should be able to create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: '1',
    questionId: '2',
    content: 'content',
  });

  expect(answer.content).toEqual('content');
});
