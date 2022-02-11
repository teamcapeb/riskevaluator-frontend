import Questionnaire from '@/objects/Questionnaire';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NavigationExtras, Router } from '@angular/router';
import { MetierService } from '@services/serviceMetier/metier.service';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-evaluation-thematique',
  templateUrl: './evaluation-thematique.component.html',
  styleUrls: ['./evaluation-thematique.component.scss']
})
export class EvaluationThematiqueComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  private _questionnaires: Observable<Questionnaire[]>;
  private test : any;
  private listMetier: number[] = [];
  state : any;
  private metierExtras: NavigationExtras = {
    state: {
      metierList : [],
      idQuestionnaire : ''
    }
  };

  constructor(private questionnaireService : QuestionnaireService,
              private router: Router) {
    type idQuestionnaireListMetier = {
      metierList: string[],
      idQuestionnaire: string
    }
   const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state as idQuestionnaireListMetier;

    this.listMetier = this.state['metierList'];
    this.metierExtras.state['metierList'] = this.state.metierList;


  }

  ngOnInit(): void {
    this._questionnaires = this.getListQuestionnaire();
  }


  getListQuestionnaire(): Observable<Questionnaire[]>{
    let finalise = new Subject();
    let obs = this.questionnaireService.getListQuestionnaire(this.listMetier);
    obs.pipe(takeUntil(finalise)).subscribe((data) =>{
        finalise.complete();
      },
      (err) => {
        this.errorModal.open(JSON.stringify(err.error));
        finalise.complete();
      });
    return obs;
  }

  myFunction(idQuestionnaire : number) : void {
    //console.log(this.state);
    this.metierExtras.state['idQuestionnaire'] = idQuestionnaire;
    this.router.navigate(['evaluer/welcome-evaluation'], this.metierExtras);

  }

  get questionnaires() : Observable<Questionnaire[]>{
    return this._questionnaires;
  }

}
