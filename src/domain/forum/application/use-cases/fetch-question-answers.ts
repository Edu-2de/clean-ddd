import type { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import type { QuestionsRepository } from '../repositories/questions-repository.js';

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionAnswersResponse {
  answers: Answer[];
}

export class FetchQuestionAnswers {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const question = await this.questionsRepository.findById(questionId);
    if (!question) throw new Error('Question not found');

    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return { answers };
  }
}
