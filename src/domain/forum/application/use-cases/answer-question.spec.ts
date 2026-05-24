import { expect, it } from 'vitest';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import { AnswerQuestionUseCase } from './answer-question.js';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer) => {
    return;
  },
};

it('should be able to create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'content',
  });

  expect(answer.content).toEqual('content');
});
