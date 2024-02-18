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
    };

    static fromJSON(jsonData: any): Question {
      const { id, title, type, question, answers, textAnswer } = jsonData;
      return new Question(id, title, question, answers, textAnswer);
    }
  }
export interface QuestionAnswer {
    id: number;
    answer: string;
    response: boolean;
  }
  
