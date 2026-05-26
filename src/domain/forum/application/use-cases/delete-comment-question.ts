import type { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionCommentFound =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionCommentFound) throw new Error('Question comment not found');

    if (questionCommentFound.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }
    await this.questionCommentsRepository.delete(questionCommentFound);

    return {};
  }
}
