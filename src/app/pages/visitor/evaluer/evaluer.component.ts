
import {IMetier} from '@/interfaces/IMetier';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MetierService } from '@services/serviceMetier/metier.service';
import { Observable, of, Subject } from "rxjs";
import { catchError, map, startWith, takeUntil } from "rxjs/operators";
import { AppDataState, DataStateEnum } from "@/state/questionnaire.state";
import { ModalService } from "@services/serviceModal/modal.service";
import Metier from '@/objects/Metier';
import Question from '@/objects/Question';
import IQuestion from '@/interfaces/IQuestion';


@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  DataStateEnum = DataStateEnum;
  metiers$: IMetier[];

  alertMetier : boolean = false;
  isOneCheck : boolean = false;

  constructor(private router: Router,
              private modalService: ModalService,
              private metierService :MetierService) {}

  ngOnInit(): void {
    this.onGetAllMetiers();
  }


  onGetAllMetiers() {
    // this.metiers$= this.metierService.getAllMetiers().pipe(
    //   map((data: IMetier[])=>{
    //     return ({dataState:DataStateEnum.LOADED,data:data})
    //   }),
    //   startWith({dataState:DataStateEnum.LOADING}),
    //   catchError(err=> {
    //     this.modalService.error(JSON.stringify(err.message));
    //     return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
    //   })
    // );
    this.metierService.getAllMetiers().subscribe((res) => {
      this.metiers$ = res.sort(
        (a, b) => {
          if (a.nomMetier < b.nomMetier) {
            return -1;
          }
          if (a.nomMetier > b.nomMetier) {
            return 1;
          }
          return 0;
        }
      );
    });
  }


  onValidateMetiers(metiers : IMetier[]) : void {
    this.metierService.metiers = metiers.filter(m => m.isChecked === true);
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

  onCheck(event : any){
    this.isOneCheck = event;
    console.log(event);
  }
}
