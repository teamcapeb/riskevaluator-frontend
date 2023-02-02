import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from "rxjs/operators";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { Observable, of } from "rxjs";
import { CategorieQuestionService } from "@services/serviceCategorieQuestion/categorie-question.service";
import { AppDataState, DataStateEnum } from "@/state/questionnaire.state";
import { IQuestionType } from "@/interfaces/IQuestionType";
import { CategorieNumberAction, EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from "@angular/router";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import {IMetier} from '@/interfaces/IMetier';
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-evaluation-questionnaire',
  templateUrl: './evaluation-questionnaire.component.html',
  styleUrls: ['./evaluation-questionnaire.component.scss']
})
export class EvaluationQuestionnaireComponent implements OnInit {

  categoriesQuestion$:Observable<AppDataState<ICategorieQuestion[]>> |null=null;
  public categoriesQuestionSize: number
  actualCategorieNumber: number = 0;

  DataStateEnum = DataStateEnum
  readonly questionnaireId:number = 1;
  readonly metierIds:number[] = [5,6];

  constructor(private questionnaireService:QuestionnaireService,
              public evaluationService: EvaluationService,
              public evalTokenService: EvalTokenStorageService,
              private route : ActivatedRoute,
              private router : Router) {

    this.questionnaireId = +this.route.snapshot.paramMap.get('idQuestionnaire');
    this.metierIds = this.route.snapshot.paramMap.get('metierIds').split(",").map(Number);

    let entreprise = evalTokenService.getEntreprise();
    this.evaluationService.onSaveEntreprise(entreprise);

    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.INIT)

  }

  ngOnInit(): void {
    this.onGetAllCategoriesQuestion();
  }

  onGetAllCategoriesQuestion() {
    this.categoriesQuestion$= this.questionnaireService.getCategoriesQuestions(this.questionnaireId,this.metierIds).pipe(
      map((data: ICategorieQuestion[])=>{
        //console.log(data);
        this.evaluationService.onUpdateCategorieMax(data.length);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> {
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }


}
