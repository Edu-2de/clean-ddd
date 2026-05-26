import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { AnswerComment } from '../../enterprise/entities/answer-comment.js';
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.ts';
import type { AnswersRepository } from '../repositories/answers-repository.js';

interface CommentOnAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answerFound = this.answersRepository.findById(answerId);
    if (!answerFound) throw new Error('Answer not found');

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),
    });

    await this.answerCommentsRepository.create(answerComment);

    return { answerComment };
  }
}
