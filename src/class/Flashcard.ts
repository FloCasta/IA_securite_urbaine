import { QuestionEnum } from "./QuestionEnum";

export class Flashcard {
    id: string;
    title: string;
    type = QuestionEnum.Flashcard;
    question: string;
    answers: FlashcardAnswer[];
    textAnswer: string;

    constructor(id: string, title: string, question: string, answers: FlashcardAnswer[], textAnswer: string) {
        this.id = id;
        this.title = title;
        this.question = question;
        this.answers = answers;
        this.textAnswer = textAnswer;
    }
    static fromJSON(jsonData: any): Flashcard {
        const { id, title, question, answers, textAnswer } = jsonData;
        return new Flashcard(id, title, question, answers, textAnswer);
    }
}

export interface FlashcardAnswer {
    id: number;
    answer: string;
    img: string;
}