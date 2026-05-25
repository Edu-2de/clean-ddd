import { beforeEach, describe, it } from 'vitest';
import { makeQuestion } from '../../../../../test/factories/make-question.js';
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository.js';
import { Slug } from '../../enterprise/entities/value-objects/slug.js';
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        title: 'title example',
        slug: Slug.create('title-example'),
      }),
    );

    const { question } = await sut.execute({ slug: 'title-example' });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual('title example');
  });
});
