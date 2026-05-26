import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository.js';

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerCommentFound =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerCommentFound) throw new Error('Answer comment not found');

    if (answerCommentFound.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }
    await this.answerCommentsRepository.delete(answerCommentFound);

    return {};
  }
}
