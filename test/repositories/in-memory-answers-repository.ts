import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js';
import { Answer } from '@/domain/forum/enterprise/entities/answer.js';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor() {}

  async findById(id: string) {
    const answer = this.items.find((answer) => answer.id.toString() === id);
    if (!answer) return null;
    return answer;
  }

  async save(answer: Answer) {
    const answerId = this.items.findIndex(
      (answerItem) => answerItem.id === answer.id,
    );
    if (answerId > -1) {
      this.items[answerId] = answer;
    }
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const answerId = this.items.findIndex(
      (answerItem) => answerItem.id === answer.id,
    );
    if (answerId > -1) {
      this.items.splice(answerId, 1);
    }
  }
}
