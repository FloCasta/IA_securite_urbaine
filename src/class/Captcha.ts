import { QuestionEnum } from "./QuestionEnum";

export class Captcha {
  id: string;
  title: string;
  type = QuestionEnum.Captcha;
  question: string;
  answers: CaptchaAnswer[];
  textAnswer: string;
  savedAnswers: number[] = [];

  constructor(id: string, title: string, question: string, answers: CaptchaAnswer[], textAnswer: string, savedAnswers?:number[]) {
    this.id = id;
    this.title = title;
    this.question = question;
    this.answers = answers;
    this.textAnswer = textAnswer;
    this.savedAnswers = savedAnswers || [];
  }
  
  static fromJSON(jsonData: any): Captcha {
    const { id, title, question, answers, textAnswer , savedAnswers } = jsonData;
    return new Captcha(id, title, question, answers, textAnswer, savedAnswers);
  }
  
  saveAnswer(answers: number[]): void {
    this.savedAnswers = answers; 
  }
}

export interface CaptchaAnswer {
    id: number;
    answer: string;
    img: string;
    response: boolean;
  }