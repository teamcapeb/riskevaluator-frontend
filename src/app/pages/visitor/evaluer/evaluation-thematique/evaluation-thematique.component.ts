import Questionnaire from '@/objects/Questionnaire';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NavigationExtras, Router } from '@angular/router';
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
    this.metierExtras.state['metierList'] = this.state.metierList;
    this.metierExtras.state['idQuestionnaire'] = this.state.idQuestionnaire;
    //this.test = this.router.getCurrentNavigation().extras.state;
    //console.log(this.state);

  }

  ngOnInit(): void {
    this._questionnaires = this.getAll();
  }

  getAll(): Observable<Questionnaire[]>{
    let finalise = new Subject();
    let obs = this.questionnaireService.getAll();
    obs.pipe(takeUntil(finalise)).subscribe((data) =>{
        //console.log(data)
        finalise.next();
        finalise.complete();
      },
      (err) => {
        this.errorModal.open(JSON.stringify(err.error));
        finalise.next();
        finalise.complete();
      });
    return obs;
  }

  myFunction(idQuestionnaire : string) : void {
    //console.log(this.state);
    this.metierExtras.state['idQuestionnaire'] = idQuestionnaire;
    this.router.navigate(['evaluer/welcome-evaluation'], this.metierExtras);

  }

  get questionnaires() : Observable<Questionnaire[]>{
    return this._questionnaires;
  }

}
