

export class Heroe {
  public id:number;
  public name: string;
  public ability: string;
  public startingPower: string;
  public currentPower: string;
  public startDate: string;
  public suitColors: string;
  public dailyPracticeState:DailyPracticeState ;

  constructor() {
  }

}
  class DailyPracticeState{
  public practiceCounter: number;
}
