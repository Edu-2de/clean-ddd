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
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'content',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
    expect(
      inMemoryAnswerRepository.items[0]?.attachments.currentItems,
    ).toHaveLength(2);
  });
});
