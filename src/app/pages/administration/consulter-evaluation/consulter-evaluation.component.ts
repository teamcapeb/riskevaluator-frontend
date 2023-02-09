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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-consulter-evaluation',
  templateUrl: './consulter-evaluation.component.html',
  styleUrls: ['./consulter-evaluation.component.scss']
})
export class ConsulterEvaluationComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  private listMetier: number[] = [];
  DataStateEnum = DataStateEnum;
  cardColor: any;
  // evaluations$ : Observable<AppDataState<IEvaluation[]>> |null=null;
  entreprises$ : IEntreprise[];
  filteredEntreprises: IEntreprise[];
  entrepriseControl = new FormControl('');
  metiers$ : IMetier[];
  filteredMetiers: IMetier[];
  metierControl = new FormControl('');
  filteredQuestionnaires: IQuestionnaire[];
  questionnaireControl = new FormControl('');

  selectedThematiques: string[];
  metierLabels : string[];

  constructor(private evaluationService : EvaluationApiService,
              private entrepriseService: EntrepriseService,
              private metierService: MetierService,
              private questionnaireService: QuestionnaireService,
              private modalService: ModalService) {
  }


  thematiques: any[][] = [];


  ngOnInit(): void {
    // this.onGetAllEvaluation();

    this.entrepriseService.getAll().subscribe((res) => {
      this.entreprises$ = this.sortEntreprises(res.filter(entreprise => entreprise.evaluations?.length > 0));
      this.filteredEntreprises = this.sortEntreprises(res.filter(entreprise => entreprise.evaluations?.length > 0));
      this.entreprises$.forEach((res,index)=>{
        this.thematiques[index] = [];
        res.evaluations.forEach(evaluation=>{
          this.evaluationService.get(evaluation.idEvaluation).subscribe(res => {
            if(!this.includeThematique(this.thematiques[index],res.scoreCategories[0].categorieQuestion.questionnaire.thematique))
              this.thematiques[index].push(res.scoreCategories[0].categorieQuestion.questionnaire.thematique);
            })
        })
      })
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.metiers$ = res;
      this.filteredMetiers = this.sortMetiers(res);
    });
    this.questionnaireService.getAllQuestionnaires().subscribe((res) => {
      this.filteredQuestionnaires = this.sortQuestionnaires(res);
    });
  }

  sortEntreprises(entreprises: IEntreprise[]): IEntreprise[] {
    return entreprises.sort(
      (a, b) => {
        if (a.nomEntreprise.toUpperCase() < b.nomEntreprise.toUpperCase()) {
          return -1;
        }
        if (a.nomEntreprise.toUpperCase() > b.nomEntreprise.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
  }

  setThematique(event:IQuestionnaire){
    console.log(event.thematique)
  }

  sortMetiers(metiers: IMetier[]) {
    return metiers.sort(
      (a, b) => {
        if (a.nomMetier.toUpperCase() < b.nomMetier.toUpperCase()) {
          return -1;
        }
        if (a.nomMetier.toUpperCase() > b.nomMetier.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
  }

  sortQuestionnaires(questionnaires: IQuestionnaire[]): IQuestionnaire[] {
    return questionnaires.sort(
      (a, b) => {
        if (a.thematique.toUpperCase() < b.thematique.toUpperCase()) {
          return -1;
        }
        if (a.thematique.toUpperCase() > b.thematique.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
  }

  filter(event: IEntreprise) {
    this.filteredEntreprises = [];
    this.filteredEntreprises.push(event);
  }

  filtreEntreprise(event: any){
    if (event.length == 0) {
      this.filteredEntreprises = this.sortEntreprises(this.entreprises$);
    } else {
      this.filteredEntreprises = [];
      this.entreprises$.forEach((entreprise)=>{
      if (entreprise.nomEntreprise.toLowerCase().includes(event.toLowerCase())){
        this.filteredEntreprises.push(entreprise);
      }})
    }
  }

  filtreThematique(event:any){
    if(this.questionnaireControl.value.length != 0){
      this.filteredEntreprises=[];
      this.entreprises$.forEach((entre,index)=>{
        this.thematiques[index].forEach((theme:any) => {
          // console.log(this.includeThematique(this.questionnaireControl.value,theme))
          if(this.includeThematique(this.questionnaireControl.value,theme)){
            this.filteredEntreprises.push(entre);
          }
        });
      })
    }else{
      this.filteredEntreprises = this.entreprises$;
    }
  }


  includeThematique(themes:string[],theme:string){
    var resultat = false;
    themes.forEach(th=>{
      if(theme==th){
        resultat = true
      }
    })
    return resultat;
  }


  filtreMetier(event:any){
    if(this.metierControl.value.length != 0){
      this.filteredEntreprises=[];
      this.entreprises$.forEach((entre)=>{
        entre.metiers.forEach((met)=>{
          if(this.includeMetier(this.metierControl.value,met.nomMetier)&& !this.filteredEntreprises.includes(entre)){
              this.filteredEntreprises.push(entre);
          }
        })
      })

    }else{
      this.filteredEntreprises = this.entreprises$;
    }

  }

  includeMetier(metiers : string[],metier : string){
    var res = false;
    metiers.forEach((met)=>{
      if(met==metier){
        res = true;
      }
    })
    return res
  }



  // onGetAllEvaluation() {
  //   this.evaluations$= this.evaluationService.getAll().pipe(
  //     map((data: IEvaluation[])=>{
  //       return ({dataState:DataStateEnum.LOADED,data:data})
  //     }),
  //     startWith({dataState:DataStateEnum.LOADING}),
  //     catchError(err=> {
  //       this.modalService.error(JSON.stringify(err.error));
  //       return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
  //     })
  //   );
  // }
}
