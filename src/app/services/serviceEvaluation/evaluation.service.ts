import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";


export enum CategorieNumberAction {
  INCREASE,
  DECREASE
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  actualCategorieIndex:BehaviorSubject<{current: number,max: number}>=new BehaviorSubject({current:0,max:0});
  readonly actualCategorieNumberObs=this.actualCategorieIndex.asObservable();

  readonly map : Map<string,string>= new Map();

  onNextCategorieNumber(action : CategorieNumberAction) {
    var currentCategoryNumber = Object.assign({}, this.actualCategorieIndex.getValue());
    action === CategorieNumberAction.INCREASE? currentCategoryNumber.current++: currentCategoryNumber.current--;

    if(currentCategoryNumber.current >= 0 && currentCategoryNumber.current < currentCategoryNumber.max) {
      this.actualCategorieIndex.next(currentCategoryNumber);
    }
  }

  onUpdateCategorieMax(... newMax: number[]) {
    let currentCategoryNumber = this.actualCategorieIndex.value;
    if(newMax> 0 ) {
      currentCategoryNumber.max = newMax;
      this.actualCategorieIndex.next(currentCategoryNumber);
    }



  }

  constructor() { }


}
