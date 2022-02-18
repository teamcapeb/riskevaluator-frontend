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


@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  DataStateEnum = DataStateEnum;
  metiers$:Observable<AppDataState<IMetier[]>> |null=null;

  @ViewChild('input') input : any;
  private idMetierChecked: number[] = [];

  constructor(    private http: HttpClient,
                  private route: ActivatedRoute,
                  private router: Router,
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
        this.errorModal.open(JSON.stringify(err.error));
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }


  myFunction() : void {
    this.router.navigate(['evaluer/evaluation-thematique',this.idMetierChecked.join(",")]);

  }


  check(event : any, metier : IMetier) : void {

    var rep = [];
    if (event.checked === true) {
      this.idMetierChecked.push(metier.idMetier);
    }

    if (event.checked === false) {
      var index: number = this.idMetierChecked.indexOf(metier.idMetier);
      this.idMetierChecked.splice(index, 1);
    }
  }
}
