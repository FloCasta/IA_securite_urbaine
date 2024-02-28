import { QuestionEnum } from "./QuestionEnum";

export class Estimation{
    id: string;
    title: string;
    type = QuestionEnum.Estimation;
    question: string;
    minNumber: number;
    maxNumber: number;
    increment: number;
    minAnswer: number;
    maxAnswer: number;
    textAnswer: string;
    savedAnswer : number = 0;

    constructor(id:string, title:string, question:string,
        minNumber:number,maxNumber:number,increment:number,minAnswer:number,
        maxAnswer:number,textAnswer:string,savedAnswer:number){
            this.id = id; 
            this.title = title;
            this.question = question;
            this.minNumber = minNumber;
            this.maxNumber = maxNumber;
            this.increment = increment;
            this.minAnswer = minAnswer;
            this.maxAnswer = maxAnswer;
            this.textAnswer = textAnswer;
            this.savedAnswer = savedAnswer || 0;
    }
    static fromJSON(jsonData: any): Estimation {
        const { id, title, question, minNumber, maxNumber, increment, minAnswer, maxAnswer, textAnswer, savedAnswer } = jsonData;
        return new Estimation(id, title, question, minNumber, maxNumber, increment, minAnswer, maxAnswer, textAnswer, savedAnswer);
      }
    saveAnswer(savedAnswer:number){
        this.savedAnswer = savedAnswer;
    }
}