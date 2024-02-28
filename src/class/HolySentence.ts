import { QuestionEnum } from "./QuestionEnum";

export class HolySentence {
    id: string;
    title: string;
    type = QuestionEnum.HolySentence;
    start_question: string;
    end_question: string;
    holy_word: string;
    textAnswer: string;
    savedAnswer: string = "";
  
    constructor(
      id: string,
      title: string,
      start_question: string,
      end_question: string,
      holy_word: string,
      textAnswer: string,
      savedAnswer:string
    ) {
      this.id = id;
      this.title = title;
      this.start_question = start_question;
      this.end_question = end_question;
      this.holy_word = holy_word;
      this.textAnswer = textAnswer;
      this.savedAnswer = savedAnswer || "";
    }

    static fromJSON(jsonData: any): HolySentence {
      const { id, title, start_question, end_question, holy_word, textAnswer, savedAnswer } = jsonData;
      return new HolySentence(id, title, start_question, end_question, holy_word, textAnswer, savedAnswer);
    }

    saveAnswer(answer: string){
      this.savedAnswer = answer;
    }
  }