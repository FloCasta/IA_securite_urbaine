import { QuestionEnum } from "./QuestionEnum";

export class HeightQuestion {
    id: string;
    title: string;
    type = QuestionEnum.Height;
    question: string;
    answers: HeightAnswer[];
    textAnswer: string;
  
    constructor(id: string, title: string, question: string, answers: HeightAnswer[], textAnswer: string) {
      this.id = id;
      this.title = title;
      this.question = question;
      this.answers = answers;
      this.textAnswer = textAnswer;
    }
    static fromJSON(jsonData: any): HeightQuestion {
      const { id, title, question, answers, textAnswer } = jsonData;
      return new HeightQuestion(id, title, question, answers, textAnswer);
    }
  }

export interface HeightAnswer {
    id: number;
    answer: string;
    response: boolean;
  }