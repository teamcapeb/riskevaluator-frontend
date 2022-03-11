import IMetier from '@/interfaces/IMetier';
import Metier from '@/objects/Metier';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MetierService } from '@services/serviceMetier/metier.service';
import { environment } from 'environments/environment';
import { Observable, of, Subject } from "rxjs";
import { catchError, map, startWith, takeUntil } from "rxjs/operators";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { AppDataState, DataStateEnum } from "@/state/questionnaire.state";
import { EvaluationHelper } from "@services/_helpers/EvaluationHelper";
import { ModalService } from "@services/serviceModal/modal.service";


@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  DataStateEnum = DataStateEnum;
  metiers$:Observable<AppDataState<IMetier[]>> |null=null;

  alertMetier : boolean = false;

  constructor(    private http: HttpClient,
                  private route: ActivatedRoute,
                  private router: Router,
                  private modalService: ModalService,
                  private metierService :MetierService) {}

  ngOnInit(): void {
    this.onGetAllMetiers();
  }


  onGetAllMetiers() {
    this.metiers$= this.metierService.getAllMetiers().pipe(
      map((data: IMetier[])=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> {
        this.modalService.error(JSON.stringify(err.message));
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }


  onValidateMetiers(metiers : IMetier[]) : void {
    let idMetierChecked: number[] =  metiers.filter(m => m.isChecked === true).map(e=> e.idMetier);
    if(idMetierChecked.length > 0) {
      this.router.navigate(['evaluer/evaluation-thematique',idMetierChecked.join(",")]);
    }
    this.alertMetier = true;

    setTimeout (() => {
      this.alertMetier = false;
    }, 4000);
  }

  getCheckced(metiers : IMetier[]) {
    let countMetiers= metiers.map(e => e.isChecked);
    this.alertMetier = countMetiers.length > 0 ;
    return countMetiers;
  }
  onCountChecked(metiers : IMetier[]){
    return metiers.filter(e => e.isChecked == true).length;
  }
}
