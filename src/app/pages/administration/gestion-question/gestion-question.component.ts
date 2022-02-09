import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '@services/serviceQuestion/question.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategorieQuestionService } from '../../../services/serviceCategorieQuestion/categorie-question.service';
import { Router } from '@angular/router';
import PreconisationCategorieQuestion from '@/objects/PreconisationCategorieQuestion';
import { PreconisationCategoriesQuestionService } from '@services/servicePreconisationCategoriesQuestion/preconisation-categories-question.service';


@Component({
  selector: 'app-gestion-question',
  templateUrl: './gestion-question.component.html',
  styleUrls: ['./gestion-question.component.scss']
})
export class GestionQuestionComponent implements OnInit {

  private _questions: Observable<Question[]>;
  private _preconisationCategorieQuestion: Observable<PreconisationCategorieQuestion[]>;

  public actualQuestion: Question;
  public idCategoriQuestion: string = '1';
  public idPreconisationCategorieQuestion: string = '1';
  @ViewChild('errorModal') errorModal: any;
  @ViewChild('questionModal') questionModal: any;
  @ViewChild('preconisationCategorieQuestionForm') preconisationCategorieQuestionForm: any;

  public actualPreconisationCategorieQuestion: PreconisationCategorieQuestion;

  constructor(private questionService: QuestionService,
              private preconisationCategoriesQuestionService : PreconisationCategoriesQuestionService,
              private categorieQuestionService: CategorieQuestionService,
              private router: Router) { }

  ngOnInit(): void {
    this._questions = this.getAll();
    this._preconisationCategorieQuestion = this.getAllPreconisationCategorieQuestion();
  }

  getAll(): Observable<Question[]>{
    let finalise = new Subject();
    let obs = this.categorieQuestionService.getAllQuestionsCategoriesQuestion(this.idCategoriQuestion);
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

  getAllPreconisationCategorieQuestion(): Observable<PreconisationCategorieQuestion[]>{
    let finalise = new Subject();
    let obs = this.categorieQuestionService.getAllPreconisationCategoriesQuestion('1');
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

  add(): void{
    this.router.navigateByUrl('gestion-question/question',
      {
        state: {
                  action: 'update' ,
                  question: new Question('', '', '', [], []),
                  idCategoriQuestion : this.idCategoriQuestion
                }
      }
    );
  }


  addSuggestion(): void{
    this.actualPreconisationCategorieQuestion = new PreconisationCategorieQuestion('',0,'');
    this.preconisationCategorieQuestionForm.open('add');
  }

  updateSuggestion(event: IListEvent){
    this.actualPreconisationCategorieQuestion = event.data;
    this.preconisationCategorieQuestionForm.open('update');
  }

  deleteSuggestion(event: IListEvent){
    this.actualPreconisationCategorieQuestion = event.data;
    this.preconisationCategorieQuestionForm.open('delete');
  }

  update(event: IListEvent){
    //this.actualQuestion = event.data;
    this.router.navigate(['gestion-question/question'],
      {
        state: {
                  action: 'update' ,
                  question: event.data
                }
      }
    );
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

  createOrUpdateOrDeletePreconisationCategorieQuestion(event: IListEvent){
    this._preconisationCategorieQuestion = null;
    let finalise = new Subject();
    let obs = null;
    if(event.action === 'update'){
      obs = this.preconisationCategoriesQuestionService.update(event.data);
    }else if (event.action === 'add'){
      obs = this.preconisationCategoriesQuestionService.create('1',event.data);
    }else if(event.action === 'delete'){
      obs = this.preconisationCategoriesQuestionService.delete(event.data);
    }
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
        this._preconisationCategorieQuestion = this.categorieQuestionService.getAllPreconisationCategoriesQuestion('1');
        finalise.next();
        finalise.complete();
      },
      (err) => {
        this.errorModal.open(JSON.stringify(err.error));
        finalise.next();
        finalise.complete();
      });
  }

  get preconisationCategorieQuestion(): Observable<PreconisationCategorieQuestion[]> {
    return this._preconisationCategorieQuestion;
  }


}
