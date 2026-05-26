import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { beforeEach, describe, it } from 'vitest';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { EditQuestionUseCase } from './edit-question.js';
import { NotAllowedError } from './errors/not-allowed-error.js';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion(
        {
          authorId: new UniqueEntityId('author-01'),
          content: 'content',
          title: 'title',
        },
        new UniqueEntityId('question-01'),
      ),
    );

    const result = await sut.execute({
      authorId: 'author-01',
      questionId: 'question-01',
      content: 'new Content',
      title: 'new Title',
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not to be able edit a question from another author', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion(
        {
          authorId: new UniqueEntityId('author-01'),
        },
        new UniqueEntityId('question-01'),
      ),
    );

    const result = await sut.execute({
      authorId: 'author-02',
      content: 'content-new',
      questionId: 'question-01',
      title: 'title-new',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
