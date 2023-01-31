import { IEntreprise } from '@/interfaces/IEntreprise';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable, of } from "rxjs";
import { AppDataState,DataStateEnum } from "@/state/questionnaire.state";
import {IMetier} from "@/interfaces/IMetier";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MetierService } from "@services/serviceMetier/metier.service";
import { catchError, map, startWith } from "rxjs/operators";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import { QuestionnaireService } from "@services/serviceQuestionnaire/questionnaire.service";
import IEvaluation from "@/interfaces/IEvaluation";
import { EvaluationApiService } from "@services/serviceEvaluation/evaluation-api.service";
import { ModalService } from "@services/serviceModal/modal.service";
import { EntrepriseService } from '@services/serviceEntreprise/entreprise.service';

@Component({
  selector: 'app-consulter-evaluation',
  templateUrl: './consulter-evaluation.component.html',
  styleUrls: ['./consulter-evaluation.component.scss']
})
export class ConsulterEvaluationComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  private listMetier: number[] = [];
  DataStateEnum = DataStateEnum;
  evaluations$ : Observable<AppDataState<IEvaluation[]>> |null=null;
  entreprises$ : IEntreprise[];
  cardColor: any;

  constructor(private evaluationService : EvaluationApiService,
              private entrepriseService: EntrepriseService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.onGetAllEvaluation();
    this.entrepriseService.getAll().subscribe((res) => {
      this.entreprises$ = res;
      console.log(res);
    });
  }


  onGetAllEvaluation() {
    this.evaluations$= this.evaluationService.getAll().pipe(
      map((data: IEvaluation[])=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> {
        this.modalService.error(JSON.stringify(err.error));
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }
}
