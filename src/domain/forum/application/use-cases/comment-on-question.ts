import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { QuestionComment } from '../../enterprise/entities/question-comment.js';
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository.js';
import type { QuestionsRepository } from '../repositories/questions-repository.js';

interface CommentOnQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const questionFound = this.questionsRepository.findById(questionId);
    if (!questionFound) throw new Error('Question not found');

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
