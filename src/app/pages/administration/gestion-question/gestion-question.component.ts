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
    this.router.navigate(['gestion-questionnaires', this._idQuestionnaire ,'gestion-categories-questions', this._idCategorie ,'gestion-questions', -1 ,'question'],
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
    let cq = new CategorieQuestion(this._idCategorie, '');
    let iCq = cq.toJSON();
    this.actualPreconisationCategorieQuestion = new PreconisationCategorieQuestion(0, '', 0, this._idCategorie, cq.toJSON());
    this.preconisationCategorieQuestionForm.open('add');
  }

  updateSuggestion(event: IListEvent){
    event.data.idCategorie = this._idCategorie;
    event.data.categorieQuestion = new CategorieQuestion(this._idCategorie, '');
    
    this.actualPreconisationCategorieQuestion = event.data;
    this.preconisationCategorieQuestionForm.open('update');
  }

  deleteSuggestion(event: IListEvent){
    this.actualPreconisationCategorieQuestion = event.data;
    this.preconisationCategorieQuestionForm.open('delete');
  }

  update(event: IListEvent){
    //this.actualQuestion = event.data;
    this.router.navigate(['gestion-questionnaires', this._idQuestionnaire ,'gestion-categories-questions', this._idCategorie ,'gestion-questions', event.data.idQuestion ,'question'],
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

  public async createOrUpdateOrDeleteQuestion(event: IListEvent){
    this._categorieQuestion = null;
    let res = null;
    try{
      if(event.action === 'update'){
        res = await this.questionService.update(event.data);
      }else if (event.action === 'add'){
        res = await this.categorieQuestionService.createQuestionCategoriesQuestion(0 ,event.data);
      }else if(event.action === 'delete'){
        res = await this.questionService.delete(event.data);
      }
      this._categorieQuestion = this.categorieQuestionService.get(this._idCategorie);
    }catch(error){
      this.errorModal.open(error.message);
    }

  }

  public async createOrUpdateOrDeletePreconisationCategorieQuestion(event: IListEvent){
    this._categorieQuestion = null;
    let res = null;
    try{
      if(event.action === 'update'){
        res = await this.preconisationCategoriesQuestionService.update(event.data);
      }else if (event.action === 'add'){
        res = await this.preconisationCategoriesQuestionService.create(event.data);
      }else if(event.action === 'delete'){
        console.log(event.data);
        res = await this.preconisationCategoriesQuestionService.delete(event.data);
      }
      this._categorieQuestion = this.categorieQuestionService.get(this._idCategorie);
    }catch(error){
      this.errorModal.open(error.message);
    }
  }

  get categorieQuestion(): Observable<CategorieQuestion> {
    return this._categorieQuestion;
  }



}
