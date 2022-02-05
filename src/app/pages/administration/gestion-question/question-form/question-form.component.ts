import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import Reponse from '@/objects/Reponse';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '@services/serviceQuestion/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  private _idConteur = 0;
  private _reponses: Reponse[];
  private _addedReponses: Reponse[];
  public action: string = '';
  public closeResult = '';
  public title: string;
  public question: Question;
  public actualReponse: Reponse;
  @ViewChild('reponseForm') reponseForm: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(private questionService: QuestionService,
              private router: Router) { }

  ngOnInit(): void {
    this.question = new Question('', '', '', []);
    let currentNavigation = this.router.getCurrentNavigation();
    if(currentNavigation){
      let state = currentNavigation.extras.state;
      this.action = state['action'];
      this.question = state['question'];
      console.log(this.question);
    }
    this._addedReponses = [];
    this.questionService.getAllReponses('1').subscribe((reponses: Reponse[]) => {
      this._reponses = reponses;
    });
  }

  add(): void{
    this.actualReponse = new Reponse('', 0, '');
    this.reponseForm.open('add');
  }

  update(event: IListEvent){
    this.actualReponse = event.data;
    this.reponseForm.open('update');
  }

  delete(event: IListEvent){
    this.actualReponse = event.data;
    this.reponseForm.open('delete');
  }

  createOrUpdateOrDeleteReponse(event: IListEvent){
    //this._reponses = null;
    //let finalise = new Subject();
    //let obs = null;
    if(event.action === 'update'){
      //obs = this.reponseService.update(event.data);
    }else if (event.action === 'add'){
      //obs = this.metierService.create(event.data);
      event.data.idReponse = this._idConteur.toString();
      this._addedReponses.push(event.data);
      this._idConteur++;
      if(this._addedReponses.length === 0){
        this._idConteur = 0;
      }
    }else if(event.action === 'delete'){
      this._reponses = this._reponses.filter(({ idReponse }) => idReponse !== event.data.idReponse);
      this._addedReponses = this._addedReponses.filter(({ idReponse }) => idReponse !== event.data.idReponse);  
      //obs = this.metierService.delete(event.data);
    }
    /*
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
      this._metiers = this.metierService.getAll();
      finalise.next();
      finalise.complete();
    },
    (err) => {
      this.errorModal.open(JSON.stringify(err.error));
      finalise.next();
      finalise.complete();
    });
    */
  }

  get reponses(): Reponse[]{
    return this._reponses;
  }
  get addedReponses(): Reponse[]{
    return this._addedReponses;
  }

}
