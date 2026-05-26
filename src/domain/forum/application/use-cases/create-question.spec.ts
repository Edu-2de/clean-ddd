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
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0]?.id).toEqual(
      result.value?.question.id,
    );
    expect(result.value?.question.content).toEqual('content');
  });
});
