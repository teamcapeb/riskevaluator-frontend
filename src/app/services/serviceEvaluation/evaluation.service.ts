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
import { IEntreprise } from '@/interfaces/IEntreprise';
import { IUser } from "@/interfaces/IUser";
import { response } from "express";
import { EvaluationApiService } from "@services/serviceEvaluation/evaluation-api.service";

export enum CategorieNumberAction {
  INCREASE,
  DECREASE,
  INIT
}


export interface IEvalIndex {
  current: number,
  max: number,
  isLastReturn? : boolean,
  isFinished? : boolean
}


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  actualCategorieIndex:BehaviorSubject<IEvalIndex>=new BehaviorSubject({current:0,max:0});
  readonly actualCategorieNumberObs=this.actualCategorieIndex.asObservable();


  evaluation:BehaviorSubject<IEvaluation>=new BehaviorSubject<IEvaluation>({
    entreprise:null,
    scoreGeneraleEvaluation:0,
    scoreCategories: null,
    date: ""
  });
  readonly evaluationObs=this.evaluation.asObservable();


  readonly questionnaireCalculator: ICategorieQuestion = {
    idCategorie: 0,
    scoreEvaluations : [],
    questions : []
  };

  constructor(private evaluationApiService : EvaluationApiService) { }


  onSaveEntreprise(entreprise : IEntreprise) {
    this.evaluation.value.entreprise = entreprise;
  }


  calculateNextCategorie(action : CategorieNumberAction) {
    var currentCategoryNumber = Object.assign({}, this.actualCategorieIndex.getValue());
    action === CategorieNumberAction.INCREASE? currentCategoryNumber.current++: currentCategoryNumber.current--;

    currentCategoryNumber.isFinished = currentCategoryNumber.current >= 0 && currentCategoryNumber.current >= currentCategoryNumber.max-1;

    currentCategoryNumber.isLastReturn = currentCategoryNumber.current < 0;

    this.actualCategorieIndex.next(currentCategoryNumber);
  }

  initNextCategorie(){
    this.actualCategorieIndex.next({ current: 0,max: 0,isLastReturn: false, isFinished : false });
  }
  onNextCategorieNumber(action : CategorieNumberAction) {
    action=== CategorieNumberAction.INIT? this.initNextCategorie() :this.calculateNextCategorie(action);
  }

  onUpdateCategorieMax(newMax: number) {
    let currentCategoryNumber = this.actualCategorieIndex.value;
    if (newMax > 0) {
      currentCategoryNumber.max = newMax;
      this.actualCategorieIndex.next(currentCategoryNumber);
    }
  }

  onCalculateScore(categoriesQuestions$: ICategorieQuestion[], user: IUser) {

    let scoreCategories: IScoreCategory[] = [];
    let sumScoreMaxTotal: number = 0;
    let nbPointsTotal: number = 0;
    let _evaluation: IEvaluation =  Object.assign({}, this.evaluation.value);

    categoriesQuestions$?.forEach( (categorie:ICategorieQuestion)  => {

      let filteredReponses : IReponse[][] | undefined = categorie
         ?.questions
         ?.map(question => {
           return question?.reponses.filter(reponse => reponse.isChecked);
         });


        const reponseReducer = (previousValue: number, currentValue: IReponse) => previousValue + currentValue.nbPoints;
        const questionReducer = (previousValue: number, currentValue: IQuestion) => previousValue + currentValue.scoreMaxPossibleQuestion;


        let nbPointsSum=  0;
        let sumScoreMaxCategorie = categorie.questions.reduce(questionReducer, 0);
        let scoreTotalCateorie = 0;

        filteredReponses.forEach(responsesOfQuestion => {
          nbPointsSum+= responsesOfQuestion.reduce(reponseReducer, 0);
        });


        if(sumScoreMaxCategorie > 0)  scoreTotalCateorie = +((nbPointsSum / sumScoreMaxCategorie)*100).toFixed();


     // if(categorie.idCategorie = 34)
     //   _evaluation.filterResponses = {filteredReponses, sumScoreMaxCategorie,nbPointsSum, scoreTotalCateorie }


      scoreCategories.push({
        categorieQuestion: categorie,
        nbPoints : scoreTotalCateorie
      });

      sumScoreMaxTotal+=sumScoreMaxCategorie;
      nbPointsTotal+=nbPointsSum;
      }
    )

    if(sumScoreMaxTotal >0 ) _evaluation.scoreGeneraleEvaluation = +((nbPointsTotal / sumScoreMaxTotal)*100).toFixed();

    _evaluation.scoreCategories = scoreCategories;


    this.evaluation.next(_evaluation);
  }


}
