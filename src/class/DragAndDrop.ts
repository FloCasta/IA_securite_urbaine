import { QuestionEnum } from "./QuestionEnum";

export class DragAndDrop {
    id: string;
    title: string;
    type = QuestionEnum.DragAndDrop;
    question: string;
    answers: DragAndDropAnswer[];
    textAnswer: string;
  
    constructor(id: string, title: string, question: string, answers: DragAndDropAnswer[], textAnswer: string) {
      this.id = id;
      this.title = title;
      this.question = question;
      this.answers = answers;
      this.textAnswer = textAnswer;
    }
  }
export interface DragAndDropAnswer {
    id: number;
    answer: string;
    response: boolean;
  }