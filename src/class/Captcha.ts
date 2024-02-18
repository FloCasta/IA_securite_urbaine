import { QuestionEnum } from "./QuestionEnum";

export class Captcha {
    id: string;
    title: string;
    type = QuestionEnum.Captcha;
    question: string;
    answers: CaptchaAnswer[];
    textAnswer: string;

    constructor(id: string, title: string, question: string, answers: CaptchaAnswer[], textAnswer: string) {
    this.id = id;
    this.title = title;
    this.question = question;
    this.answers = answers;
    this.textAnswer = textAnswer;
    }
}

export interface CaptchaAnswer {
    id: number;
    answer: string;
    img: string;
    response: boolean;
  }