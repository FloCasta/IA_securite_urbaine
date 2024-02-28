export class Point{
    point:number;
    displayAnswer?:string;
    selectedAnswer?: number[];
    
    constructor(p : number, f:any, displayAnswer?:string){
        this.point = p;
        this.displayAnswer = displayAnswer;
        this.form=f;
    }
}