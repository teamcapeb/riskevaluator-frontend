import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '@services/serviceQuestion/question.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategorieQuestionService } from '../../../services/serviceCategorieQuestion/categorie-question.service';

@Component({
  selector: 'app-gestion-question',
  templateUrl: './gestion-question.component.html',
  styleUrls: ['./gestion-question.component.scss']
})
export class GestionQuestionComponent implements OnInit {

  private _questions: Observable<Question[]>;
  public actualQuestion: Question;
  @ViewChild('errorModal') errorModal: any;
  @ViewChild('questionModal') questionModal: any;

  constructor(private questionService: QuestionService, private categorieQuestionService: CategorieQuestionService) { }

  ngOnInit(): void {
    this._questions = this.getAll();
  }

  getAll(): Observable<Question[]>{
    let finalise = new Subject();
    let obs = this.categorieQuestionService.getAllQuestionsCategoriesQuestion('1');
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
    //this.actualQuestion = new Question('', '', '', []);
    //this.questionModal.open('add');
  }

  update(event: IListEvent){
    //this.actualQuestion = event.data;
    //this.questionModal.open('update');
  }

  delete(event: IListEvent){
    this.actualQuestion = event.data;
    this.questionModal.open('delete');
  }

  createOrUpdateOrDeleteQuestion(event: IListEvent){
    this._questions = null;
    let finalise = new Subject();
    let obs = null;
    if(event.action === 'update'){
      obs = this.questionService.update(event.data);
    }else if (event.action === 'add'){
      obs = this.categorieQuestionService.createQuestionCategoriesQuestion('1' ,event.data);
    }else if(event.action === 'delete'){
      obs = this.questionService.delete(event.data);
    }
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
      this._questions = this.getAll();
      finalise.next();
      finalise.complete();
    },
    (err) => {
      this.errorModal.open(JSON.stringify(err.error));
      finalise.next();
      finalise.complete();
    });
  }

  get questions(): Observable<Question[]> {
    return this._questions;
  }

}
