import { QuestionEnum } from "./QuestionEnum";

export class Flashcard {
    id: string;
    title: string;
    type = QuestionEnum.Flashcard;
    question: string;
    answers: FlashcardAnswer[];
    textAnswer: string;
    savedAnswers: any[] = [];

    constructor(id: string, title: string, question: string, answers: FlashcardAnswer[], textAnswer: string, savedAnswers?:any[]) {
        this.id = id;
        this.title = title;
        this.question = question;
        this.answers = answers;
        this.textAnswer = textAnswer;
        this.savedAnswers = savedAnswers || [];
    }
    static fromJSON(jsonData: any): Flashcard {
        const { id, title, question, answers, textAnswer, savedAnswers } = jsonData;
        return new Flashcard(id, title, question, answers, textAnswer, savedAnswers);
    }

    saveAnswer(answers: any[]): void {
        this.savedAnswers = answers; 
    }
}

export interface FlashcardAnswer {
    answer: string;
    img: string;
}