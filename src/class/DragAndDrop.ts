import { QuestionEnum } from "./QuestionEnum";

export class DragAndDrop {
    id: string;
    title: string;
    type = QuestionEnum.DragAndDrop;
    question: string;
    answers: DragAndDropAnswer[];
    textAnswer: string;
    savedAnswer: any[] = [];
  
    constructor(id: string, title: string, question: string, answers: DragAndDropAnswer[], textAnswer: string, savedAnswer?: any[]) {
      this.id = id;
      this.title = title;
      this.question = question;
      this.answers = answers;
      this.textAnswer = textAnswer;
      this.savedAnswer = savedAnswer || [];
    }
    static fromJSON(jsonData: any): DragAndDrop {
      const { id, title, question, answers, textAnswer, savedAnswer } = jsonData;
      return new DragAndDrop(id, title, question, answers, textAnswer, savedAnswer);
    }

    saveAnswer(answer: any[]){
      this.savedAnswer = answer;
    }

  }
export interface DragAndDropAnswer {
    id: number;
    answer: string;
    response: boolean;
  }