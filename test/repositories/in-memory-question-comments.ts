import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository.js';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js';

export class InMemoryQuestionComments implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

  constructor() {}

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }
}
