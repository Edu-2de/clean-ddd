import type { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository.js';
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.js';

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  constructor() {}

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (questionAttachment) =>
        questionAttachment.questionId.toString() === questionId,
    );

    return questionAttachments;
  }
}
