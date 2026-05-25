import type { AnswersRepository } from '../repositories/answers-repository.js';

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCseResponse> {
    const answerFound = await this.answersRepository.findById(answerId);

    if (!answerFound) {
      throw new Error('Answer not found');
    }

    if (answerFound.authorId.toString() !== authorId) {
      throw new Error('Unauthorized');
    }

    await this.answersRepository.delete(answerFound);

    return {};
  }
}
