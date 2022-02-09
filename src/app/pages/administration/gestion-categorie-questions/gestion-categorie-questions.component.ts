import IListEvent from '@/interfaces/IListEvent';
import PreconisationGlobale from '@/objects/PreconisationGlobale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PreconisationGlobaleService } from '@services/servicePreconisationGlobale/preconisation-globale.service';
import { Observable } from 'rxjs';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import CategorieQuestion from '@/objects/CategorieQuestion';
import { CategorieQuestionService } from '@services/serviceCategorieQuestion/categorie-question.service';
import Questionnaire from '../../../objects/Questionnaire';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-categorie-questions',
  templateUrl: './gestion-categorie-questions.component.html',
  styleUrls: ['./gestion-categorie-questions.component.scss']
})
export class GestionCategorieQuestionsComponent implements OnInit {

  //private _preconisationGlobale: Observable<PreconisationGlobale[]>;
  //private _categorieQuestion: Observable<CategorieQuestion[]>

  private _questionnaire: Observable<Questionnaire>;
  private _idQuestionnaire: number = 0;;

  @ViewChild('preconisationGlobaleForm') preconisationGlobaleForm: any;
  @ViewChild('errorModal') errorModal: any;
  @ViewChild('categorieQuestionForm') categorieQuestionForm: any;

  public actualPreconisationGlobale: PreconisationGlobale;
  public actualCategorieQuestion: CategorieQuestion;



  constructor(private questionnaireService: QuestionnaireService,
              private preconisationGlobaleService: PreconisationGlobaleService,
              private categorieQuestionService: CategorieQuestionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let idQuestionnaire = this.activatedRoute.snapshot.paramMap.get('idQuestionnaire')
    if(idQuestionnaire){
      this._idQuestionnaire = parseInt(idQuestionnaire);
      this._questionnaire = this.questionnaireService.get(this._idQuestionnaire);
    }else{
      this.router.navigate(['/']);
    }
  }


  ngAfterViewInit(){
    //this._preconisationGlobale = this.questionnaireService.
    //this._categorieQuestion = this.getAllC();
  }


  add(): void{
    this.actualPreconisationGlobale = new PreconisationGlobale(0,'', 0, new Questionnaire(this._idQuestionnaire, '', [], []).toJSON());
    this.preconisationGlobaleForm.open('add');
  }

  addC(): void{
    this.actualCategorieQuestion = new CategorieQuestion(0, '', new Questionnaire(this._idQuestionnaire, '', [], []).toJSON(), [], []);
    this.categorieQuestionForm.open('add');
  }

  update(event: IListEvent){
    event.data.questionnaire = new Questionnaire(this._idQuestionnaire, '', [], []);
    this.actualPreconisationGlobale = event.data;
    this.preconisationGlobaleForm.open('update');
  }

  updateC(event: IListEvent){
    this.router.navigate(['/gestion-questionnaires', this._idQuestionnaire, 'gestion-categories-questions', event.data.idCategorie, 'gestion-questions']);
  }

  delete(event: IListEvent){
    this.actualPreconisationGlobale = event.data;
    this.preconisationGlobaleForm.open('delete');
  }

  deleteC(event: IListEvent){
    this.actualCategorieQuestion = event.data;
    this.categorieQuestionForm.open('delete');
  }

  public async createOrUpdateOrDeleteCategorieQuestion(event: IListEvent): Promise<void>{
    this._questionnaire = null;
    let res = null;
    try{
      if(event.action === 'update'){
        res = await this.categorieQuestionService.update(event.data);
      }else if (event.action === 'add'){
        res = await this.categorieQuestionService.create(event.data);
      }else if(event.action === 'delete'){
        res = await this.categorieQuestionService.delete(event.data);
      }
      this._questionnaire = this.questionnaireService.get(this._idQuestionnaire);
    }catch(error){
      this.errorModal.open(error.message);
    }
  }


  public async createOrUpdateOrDeletePreconisationGlobale(event: IListEvent): Promise<void>{
    this._questionnaire = null;
    let res = null;
    try{
      if(event.action === 'update'){
        res = await this.preconisationGlobaleService.update(event.data);
      }else if (event.action === 'add'){
        res = await this.preconisationGlobaleService.create(event.data);
      }else if(event.action === 'delete'){
        res = await this.preconisationGlobaleService.delete(event.data);
      }
      this._questionnaire = this.questionnaireService.get(this._idQuestionnaire);
    }catch(error){
      this.errorModal.open(error.message);
    }
  }

  get questionnaire(): Observable<Questionnaire> {
    return this._questionnaire;
  }
/*
  get preconisationGlobales(): Observable<PreconisationGlobale[]> {
    return this._preconisationGlobale;
  }

  get categorieQuestions(): Observable<CategorieQuestion[]> {
    return this._categorieQuestion;
  }
*/
}
