import { QuestionEnum } from "./QuestionEnum";

export class ConnectPairs {
  id: string;
  title: string;
  type = QuestionEnum.ConnectPairs;
  pairs: PairItem[];

  constructor(id: string, title: string, pairs: PairItem[]) {
    this.id = id;
    this.title = title;
    this.pairs = pairs;
  }

  static fromJSON(jsonData: any): ConnectPairs {
    const { id, title, pairs } = jsonData;
    return new ConnectPairs(id, title, pairs);
  }
}

export interface PairItem {
  item1: string;
  item2: string;
}