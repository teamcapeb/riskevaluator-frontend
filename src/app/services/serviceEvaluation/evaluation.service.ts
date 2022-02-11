import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import Questionnaire from '@/objects/Questionnaire';
import CategorieQuestion from "@/objects/CategorieQuestion";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IQuestion from "@/interfaces/IQuestion";
import IEvaluation from "@/interfaces/IEvaluation";
import IScoreCategory from "@/interfaces/IScoreCategory";
import IReponse from '@/interfaces/IReponse';


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

  readonly questionnaireCalculator: ICategorieQuestion = {
    idCategorie: 0,
    scoreEvaluations : [],
    questions : []
  };

  constructor() { }


  onNextCategorieNumber(action : CategorieNumberAction) {
    var currentCategoryNumber = Object.assign({}, this.actualCategorieIndex.getValue());
    action === CategorieNumberAction.INCREASE? currentCategoryNumber.current++: currentCategoryNumber.current--;

    if(currentCategoryNumber.current >= 0 && currentCategoryNumber.current < currentCategoryNumber.max) {
      this.actualCategorieIndex.next(currentCategoryNumber);
    }
  }

  onUpdateCategorieMax(newMax: number) {
    let currentCategoryNumber = this.actualCategorieIndex.value;
    if (newMax > 0) {
      currentCategoryNumber.max = newMax;
      this.actualCategorieIndex.next(currentCategoryNumber);
    }
  }

  onCalculateScore(categoriesQuestions$: ICategorieQuestion[]) {

    let scoreCategories: IScoreCategory[] = [];
    let evaluation: IEvaluation;
    categoriesQuestions$?.forEach( categorie => {

      let filteredReponses : IReponse[][] | undefined = categorie
         ?.questions
         ?.map(question => {
           return question?.reponses?.filter(reponse => reponse.isChecked);
         });

        const reponseReducer = (previousValue: number, currentValue: IReponse) => previousValue + currentValue.nbPoints;
        const questionReducer = (previousValue: number, currentValue: IQuestion) => previousValue + currentValue.scoreMaxPossibleQuestion;


        let initialValue = 0
        let nbPointsSum=  0;

        let sumScoreMaxCategorie = categorie.questions.reduce(questionReducer, 0);
        let scoreTotalCateorie = 0;

        filteredReponses.forEach(response => {
          nbPointsSum+= response.reduce(reponseReducer, initialValue);
        });

      console.log(categorie.libelle + "  Score :  " + nbPointsSum + "/" + sumScoreMaxCategorie) // logs 6

      if(sumScoreMaxCategorie > 0)  scoreTotalCateorie = (nbPointsSum / sumScoreMaxCategorie)*100;


      }
    )
  }


}
