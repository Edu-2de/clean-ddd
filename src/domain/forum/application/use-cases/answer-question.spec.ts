import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js';
import { AnswerQuestionUseCase } from './answer-question.js';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'content',
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0]?.id).toEqual(answer.id);
    expect(answer.content).toEqual('content');
  });
});
