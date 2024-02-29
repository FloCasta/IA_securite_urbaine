import { QuestionEnum } from "./QuestionEnum";

export class Hanged {
    id: string;
    title: string;
    type = QuestionEnum.Hanged;
    start_question: string;
    end_question: string;
    word: string;
    textAnswer: string;
    selectedAnswer:string = "";
    alphabet: any[] = [];
    emptyWord: string[] = [];
    canvas: any = null;

    constructor(id: string, title: string, start_question: string, end_question: string,
        word: string, textAnswer: string, selectedAnswer?: string, alphabet?:any[],
        emptyWord?: string[], canvas?: HTMLCanvasElement) {
        this.id = id;
        this.title = title;
        this.start_question = start_question;
        this.end_question = end_question;
        this.word = word;
        this.textAnswer = textAnswer;
        this.selectedAnswer = selectedAnswer || "";
        this.alphabet = alphabet || [];
        this.emptyWord = emptyWord || [];
        this.canvas = canvas;
    }

    static fromJSON(jsonData: any): Hanged {
        const { id, title, start_question, end_question, word,textAnswer, selectedAnswer, alphabet, emptyWord, canvas } = jsonData;
        return new Hanged(id, title,start_question, end_question, word, textAnswer, selectedAnswer, alphabet, emptyWord, canvas);
      }
    
    saveAnswer(selectedAnswer:string,alphabet:any[],emptyWord:string[],canvas:HTMLCanvasElement){
        this.selectedAnswer = selectedAnswer;
        this.alphabet = alphabet;
        this.emptyWord = emptyWord;
        this.canvas = canvas;
    }
}