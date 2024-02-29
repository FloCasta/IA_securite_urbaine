import { QuestionEnum } from "./QuestionEnum";

export class ConnectPairs {
  id: string;
  title: string;
  type = QuestionEnum.ConnectPairs;
  pairs: PairItem[];
  savedAnswersConnections: number[] = [];
  savedAnswersLines: number[] = [];

  constructor(id: string, title: string, pairs: PairItem[], c?: any[], l?:any[]) {
    this.id = id;
    this.title = title;
    this.pairs = pairs;
    this.savedAnswersConnections = c || [];
    this.savedAnswersLines = l || [];
  }

  static fromJSON(jsonData: any): ConnectPairs {
    const { id, title, pairs, savedAnswersConnections, savedAnswersLines } = jsonData;
    return new ConnectPairs(id, title, pairs, savedAnswersConnections, savedAnswersLines);
  }

  saveAnswer(connections: any[],lines: any[]): void {
    this.savedAnswersConnections = connections; 
    this.savedAnswersLines = lines; 
  }
}

export interface PairItem {
  item1: string;
  item2: string;
}