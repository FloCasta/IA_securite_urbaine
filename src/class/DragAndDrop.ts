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
    static fromJSON(jsonData: any): DragAndDrop {
      const { id, title, question, answers, textAnswer } = jsonData;
      return new DragAndDrop(id, title, question, answers, textAnswer);
    }

  }
export interface DragAndDropAnswer {
    id: number;
    answer: string;
    response: boolean;
  }