import { QuestionEnum } from "./QuestionEnum";

export class Question {
    id: string;
    title: string;
    type =QuestionEnum.Question;
    question: string;
    answers: QuestionAnswer[];
    textAnswer: string;
  
    constructor(id: string, title: string, question: string, answers: QuestionAnswer[], textAnswer: string) {
      this.id = id;
      this.title = title;
      this.question = question;
      this.answers = answers;
      this.textAnswer = textAnswer;
    }
  }
export interface QuestionAnswer {
    id: number;
    answer: string;
    response: boolean;
  }
  
