import IListEvent from '@/interfaces/IListEvent';
import Questionnaire from '@/objects/Questionnaire';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gestion-questionnaire',
  templateUrl: './gestion-questionnaire.component.html',
  styleUrls: ['./gestion-questionnaire.component.scss']
})
export class GestionQuestionnaireComponent implements OnInit {

  private _questionnaires: Observable<Questionnaire[]>;

  @ViewChild('QuestionnaireForm') QuestionnaireForm : any;
  @ViewChild('errorModal') errorModal: any;

  public actualQuestionnaire: Questionnaire;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    let finalise = new Subject();
    this._questionnaires = this.getAll();
  }

  getAll(): Observable<Questionnaire[]>{
    let finalise = new Subject();
    let obs = this.questionnaireService.getAll();
    obs.pipe(takeUntil(finalise)).subscribe(() =>{
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

  add(): void{
    /*this.actualQuestionnaire = new Metier('', '');*/
    this.actualQuestionnaire = new Questionnaire('','',[],[]);
    this.QuestionnaireForm.open('add');
  }

  update(event: IListEvent){
    this.actualQuestionnaire = event.data;
    this.QuestionnaireForm.open('update');
  }

  delete(event: IListEvent){
    this.actualQuestionnaire = event.data;
    this.QuestionnaireForm.open('delete');
  }

  createOrUpdateOrDeleteQuestionnaire(event: IListEvent){
    this._questionnaires = null;
    let finalise = new Subject();
    let obs = null;
    if(event.action === 'update'){
      obs = this.questionnaireService.update(event.data.questionId, event.data );
    }else if (event.action === 'add'){
      obs = this.questionnaireService.create(event.data);
    }else if(event.action === 'delete'){
      obs = this.questionnaireService.delete(event.data);
    }
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
      this._questionnaires = this.questionnaireService.getAll();
      finalise.next();
      finalise.complete();
    },
    (err) => {
      this.errorModal.open(JSON.stringify(err.error));
      finalise.next();
      finalise.complete();
    });
  }

  get questionnaires(): Observable<Questionnaire[]> {
    return this._questionnaires;
  }


}
