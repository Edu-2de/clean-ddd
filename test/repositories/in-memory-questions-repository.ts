import type { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository.js';
import type { Question } from '@/domain/forum/enterprise/entities/question.js';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  constructor() {}

  async findById(id: string) {
    const question = this.items.find(
      (question) => question.id.toString() == id,
    );
    if (!question) return null;

    return question;
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex(
      (questionItem) => questionItem.id === question.id,
    );
    if (questionIndex > -1) {
      this.items.splice(questionIndex, 1);
    }
  }

  async findBySlug(slug: string) {
    const question = this.items.find(
      (question) => question.slug.value === slug,
    );
    if (!question) {
      return null;
    }
    return question;
  }

  async create(question: Question) {
    this.items.push(question);
  }
}
