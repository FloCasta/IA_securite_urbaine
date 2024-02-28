import { QuestionEnum } from "./QuestionEnum";

export class HeightQuestion {
    id: string;
    title: string;
    type = QuestionEnum.Height;
    question: string;
    answers: HeightAnswer[];
    textAnswer: string;
    savedAnswers: number[] = [];
  
    constructor(id: string, title: string, question: string, answers: HeightAnswer[], textAnswer: string, savedAnswers?:number[]) {
      this.id = id;
      this.title = title;
      this.question = question;
      this.answers = answers;
      this.textAnswer = textAnswer;
      this.savedAnswers = savedAnswers || [];
    }
    static fromJSON(jsonData: any): HeightQuestion {
      const { id, title, question, answers, textAnswer, savedAnswers } = jsonData;
      return new HeightQuestion(id, title, question, answers, textAnswer, savedAnswers);
    }

    saveAnswer(answers: number[]): void {
      this.savedAnswers = answers; 
    }
  }

export interface HeightAnswer {
    id: number;
    answer: string;
    response: boolean;
  }