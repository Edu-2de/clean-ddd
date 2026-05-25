import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { beforeEach, describe } from 'vitest';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { DeleteQuestionUseCase } from './delete-question.js';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a question', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion(
        { authorId: new UniqueEntityId('author-01') },
        new UniqueEntityId('question-01'),
      ),
    );

    await sut.execute({
      authorId: 'author-01',
      questionId: 'question-01',
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it(' should  not be able to delete a question from another user ', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion(
        { authorId: new UniqueEntityId('author-01') },
        new UniqueEntityId('question-01'),
      ),
    );

    await expect(() =>
      sut.execute({
        authorId: 'author-02',
        questionId: 'question-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
