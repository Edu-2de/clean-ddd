import { left, right, type Either } from '@/core/either.js';
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js';

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerCommentFound =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerCommentFound) {
      return left('Answer comment not found');
    }

    if (answerCommentFound.authorId.toString() !== authorId) {
      return left('Not allowed');
    }

    await this.answerCommentsRepository.delete(answerCommentFound);

    return right({});
  }
}
