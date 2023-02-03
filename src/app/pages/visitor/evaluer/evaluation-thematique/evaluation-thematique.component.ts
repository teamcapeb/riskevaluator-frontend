import Questionnaire from '@/objects/Questionnaire';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { Observable, of, Subject } from "rxjs";
import { catchError, map, startWith, takeUntil } from "rxjs/operators";
import { AppDataState, DataStateEnum } from "@/state/questionnaire.state";
import {IMetier} from "@/interfaces/IMetier";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IReponse from "@/interfaces/IReponse";
import { EvaluationHelper } from "@services/_helpers/EvaluationHelper";
import { environment } from 'environments/environment';

@Component({
  selector: 'app-evaluation-thematique',
  templateUrl: './evaluation-thematique.component.html',
  styleUrls: ['./evaluation-thematique.component.scss']
})
export class EvaluationThematiqueComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  private listMetier: number[] = [];
  DataStateEnum = DataStateEnum;
  questionnaires$ : Observable<AppDataState<IQuestionnaire[]>> |null=null;
  cardColor: any;

  constructor(private questionnairesService : QuestionnaireService,
              private router: Router,
              private route: ActivatedRoute) {
    type idQuestionnaireListMetier = {
      metierList: string[],
      idQuestionnaire: number
    }

    let joinedMetiers = this.route.snapshot.paramMap.get('metiers') as string;
    this.listMetier = joinedMetiers.split(",").map(Number);

  }

  ngOnInit(): void {
    this.onGetAllQuestionnaire();
  }


  onGetAllQuestionnaire() {
    this.questionnaires$= this.questionnairesService.getQuestionnairesByMetiers(this.listMetier).pipe(
      map((data: IQuestionnaire[])=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> {
        this.errorModal.open(JSON.stringify(err.error));
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }

  myFunction(idQuestionnaire : number) : void {
    //console.log(this.state);
    this.router.navigate(['evaluer/welcome-evaluation', {idQuestionnaire, metierIds: this.listMetier.join(",") }]);

  }

  calculateNbTotalQuestions(questionnaire : IQuestionnaire) : number{
    const reducer = (previousValue: number, currentValue: ICategorieQuestion) => {
      return previousValue + currentValue?.questions?.length;
    }
    const total = questionnaire?.categorieQuestions.reduce(reducer,0);
    return total;
  }

  calculateColor = (id : number) => {
    let colors: string[] = environment.evaluerIHM.gradientColors;
    return colors[id%colors.length];
  }
  public back(){
    this.router.navigate(['/evaluer']);

  }

}
