import IListEvent from '@/interfaces/IListEvent';
import Questionnaire from '@/objects/Questionnaire';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@services/serviceModal/modal.service';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-questionnaire',
  templateUrl: './gestion-questionnaire.component.html',
  styleUrls: ['./gestion-questionnaire.component.scss']
})
export class GestionQuestionnaireComponent implements OnInit {

  private _questionnaires: Observable<Questionnaire[]>;

  @ViewChild('QuestionnaireForm') QuestionnaireForm : any;

  public actualQuestionnaire: Questionnaire;

  constructor(private router: Router,
              private modalService: ModalService,
              private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
      this._questionnaires = this.questionnaireService.getAll();
  }

  ngAfterViewInit(){
  }


  add(): void{
    /*this.actualQuestionnaire = new Metier('', '');*/
    this.actualQuestionnaire = new Questionnaire(0,'',[],[]);
    this.QuestionnaireForm.open('add');
  }

  update(event: IListEvent){
    this.actualQuestionnaire = event.data;
    this.QuestionnaireForm.open('update');
    //this.router.navigate(['/gestion-questionnaires', event.data.idQuestionnaire, 'gestion-categories-questions']);
  }

  questionnaireDetails(event: IListEvent){
    this.router.navigate(['/gestion-questionnaires', event.data.idQuestionnaire, 'gestion-categories-questions']);
  }

  delete(event: IListEvent){
    this.actualQuestionnaire = event.data;
    this.QuestionnaireForm.open('delete');
  }

  public async createOrUpdateOrDeleteQuestionnaire(event: IListEvent): Promise<void>{
    this._questionnaires = null;
    let res = null;
    try{
      if(event.action === 'update'){
        res =  await this.questionnaireService.update(event.data);
      }else if (event.action === 'add'){
        res = await this.questionnaireService.create(event.data);
      }else if(event.action === 'delete'){
        res = await this.questionnaireService.delete(event.data);
      }
    }catch(error){
      if( error.status === 409 ){
        this.modalService.error('Ce questionnaire existe déjà !');
      }
    }
    this._questionnaires = this.questionnaireService.getAll();
  }

  get questionnaires(): Observable<Questionnaire[]> {
    return this._questionnaires;
  }


}
