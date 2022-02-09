import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import Reponse from '@/objects/Reponse';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '@services/serviceQuestion/question.service';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CategorieQuestionService } from '@services/serviceCategorieQuestion/categorie-question.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  public idCategorieQuestion: string = '1';
  public closeResult = '';
  public title: string;
  public saved: boolean = true;
  public question: Question;
  public actualReponse: Reponse;
  @ViewChild('reponseForm') reponseForm: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(private questionService: QuestionService,
              private router: Router,
              private route: ActivatedRoute, 
              private categorieQuestionService: CategorieQuestionService) { 
                let nav: Navigation = this.router.getCurrentNavigation();
                this.action = nav.extras.state['action'];
                this.question = nav.extras.state['question'];
                this.idCategorieQuestion = nav.extras.state['idCategorieQuestion'];
              }

  ngOnInit(): void {
    //this.question = new Question('', '', '', []);
    this._addedReponses = [];
    /*
    this.questionService.getAllReponses(this.question.idQuestion).subscribe((reponses: Reponse[]) => {
      this._reponses = reponses;
    });
    */
  }

  add(): void{
    this.actualReponse = new Reponse(0, null, 0, '');
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

  public async save(){
    this.saved = false;
    this.question.reponses = this.reponses;
    this._addedReponses = this.addedReponses.map<Reponse>((reponse: Reponse) => {
      reponse.idReponse = 0;
      return reponse;
    });
    this.question.reponses.push(...this.addedReponses);
    let res = null;
    try{
      if(this.action === 'update'){
        res = await this.questionService.update(this.question);
      }else if (this.action === 'add'){
        res = await this.categorieQuestionService.createQuestionCategoriesQuestion(0, this.question);
      }
      this.saved = true;
      this.router.navigate(['gestion-question'], {state:{idCategorieQuestion: this.idCategorieQuestion}});
    }catch(error){
      this.errorModal.open(error.message);
    }
  }

  back(){
    this.router.navigate(['gestion-question'], {state:{idCategorieQuestion: this.idCategorieQuestion}});
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
  }

  get reponses(): Reponse[]{
    return this._reponses;
  }
  get addedReponses(): Reponse[]{
    return this._addedReponses;
  }

}
