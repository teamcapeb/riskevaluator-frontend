import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '@services/serviceQuestion/question.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategorieQuestionService } from '../../../services/serviceCategorieQuestion/categorie-question.service';
import { ActivatedRoute, Router } from '@angular/router';
import PreconisationCategorieQuestion from '@/objects/PreconisationCategorieQuestion';
import { PreconisationCategoriesQuestionService } from '@services/servicePreconisationCategoriesQuestion/preconisation-categories-question.service';
import CategorieQuestion from '../../../objects/CategorieQuestion';


@Component({
  selector: 'app-gestion-question',
  templateUrl: './gestion-question.component.html',
  styleUrls: ['./gestion-question.component.scss']
})
export class GestionQuestionComponent implements OnInit {

  //private _questions: Observable<Question[]>;
  //private _preconisationCategorieQuestion: Observable<PreconisationCategorieQuestion[]>;
  private _categorieQuestion: Observable<CategorieQuestion>;
  private _idQuestionnaire: number;
  private _idCategorie: number;

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
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    let idQuestionnaire = this.activatedRoute.snapshot.paramMap.get('idQuestionnaire')
    let idCategorie = this.activatedRoute.snapshot.paramMap.get('idCategorie')
    if(idQuestionnaire && idCategorie){
      this._idQuestionnaire = parseInt(idQuestionnaire);
      this._idCategorie = parseInt(idCategorie);
      this._categorieQuestion = this.categorieQuestionService.get(this._idCategorie);
    }else{
      this.router.navigate(['/']);
    }
  }

  add(): void{
    this.router.navigateByUrl('gestion-question/question',
      {
        state: {
                  action: 'update' ,
                  question: new Question(0, '', '', [], []),
                  idCategoriQuestion : this.idCategoriQuestion
                }
      }
    );
  }


  addSuggestion(): void{
    //this.actualPreconisationCategorieQuestion = new PreconisationCategorieQuestion('',0,'');
    //this.preconisationCategorieQuestionForm.open('add');
  }

  updateSuggestion(event: IListEvent){
    //this.actualPreconisationCategorieQuestion = event.data;
    //this.preconisationCategorieQuestionForm.open('update');
  }

  deleteSuggestion(event: IListEvent){
    //this.actualPreconisationCategorieQuestion = event.data;
    //this.preconisationCategorieQuestionForm.open('delete');
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
    let res = null;
    try{
      if(event.action === 'update'){
        res = this.questionService.update(event.data);
      }else if (event.action === 'add'){
        res = this.categorieQuestionService.createQuestionCategoriesQuestion(0 ,event.data);
      }else if(event.action === 'delete'){
        res = this.questionService.delete(event.data);
      }
    }catch(error){
      this.errorModal.open(error.message);
    }

  }

  createOrUpdateOrDeletePreconisationCategorieQuestion(event: IListEvent){
    let res = null;
    try{
      if(event.action === 'update'){
        res = this.preconisationCategoriesQuestionService.update(event.data);
      }else if (event.action === 'add'){
        res = this.categorieQuestionService.createQuestionCategoriesQuestion(0,event.data);
      }else if(event.action === 'delete'){
        res = this.preconisationCategoriesQuestionService.delete(event.data);
      }
    }catch(error){
      this.errorModal.open(error.message);
    }
  }

  get categorieQuestion(): Observable<CategorieQuestion> {
    return this._categorieQuestion;
  }



}
