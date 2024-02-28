import { QuestionEnum } from "./QuestionEnum";

export class MultipleChoice {
    id: string;
    title: string;
    type = QuestionEnum.MultipleChoice;
    question: string;
    answers: MultipleChoiceAnswer[];
    textAnswer: string;
    savedAnswers: number[] = [];
  
    constructor(id: string, title: string, question: string, answers: MultipleChoiceAnswer[], textAnswer: string, savedAnswers?:number[]) {
      this.id = id;
      this.title = title;
      this.question = question;
      this.answers = answers;
      this.textAnswer = textAnswer;
      this.savedAnswers = savedAnswers || [];
    };

    static fromJSON(jsonData: any): MultipleChoice {
      const { id, title, question, answers, textAnswer, savedAnswers } = jsonData;
      return new MultipleChoice(id, title, question, answers, textAnswer, savedAnswers);
    }

    saveAnswer(answers: number[]): void {
      this.savedAnswers = answers; 
    }
  }
export interface MultipleChoiceAnswer {
    id: number;
    answer: string;
    response: boolean;
  }
  
