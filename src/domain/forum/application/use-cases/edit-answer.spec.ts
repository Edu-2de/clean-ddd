import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { beforeEach, describe, it } from 'vitest';
import { makeAnswer } from '../../../../../test/factories/make-answer.js';
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository.js';
import { EditAnswerUseCase } from './edit-answer.js';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer(
        {
          authorId: new UniqueEntityId('author-01'),
          content: 'content',
        },
        new UniqueEntityId('answer-01'),
      ),
    );

    const { answer } = await sut.execute({
      authorId: 'author-01',
      answerId: 'answer-01',
      content: 'new Content',
    });

    expect(answer.content).toEqual('new Content');
  });

  it('should not to be able edit a answer from another author', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer(
        {
          authorId: new UniqueEntityId('author-01'),
        },
        new UniqueEntityId('answer-01'),
      ),
    );

    await expect(() =>
      sut.execute({
        authorId: 'author-02',
        content: 'content-new',
        answerId: 'answer-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
