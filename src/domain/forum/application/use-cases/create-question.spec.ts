import { describe, expect, it } from 'vitest';
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { CreateQuestionUseCase } from './create-question.js';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be able to create an question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'content',
      title: 'title',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
    expect(
      inMemoryQuestionRepository.items[0]?.attachments.currentItems,
    ).toHaveLength(2);
  });
});
