import IListEvent from '@/interfaces/IListEvent';
import PreconisationGlobale from '@/objects/PreconisationGlobale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreconisationGlobaleService } from '@services/servicePreconisationGlobale/preconisation-globale.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorModalComponent } from '@components/error-modal/error-modal.component';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import CategorieQuestion from '@/objects/CategorieQuestion';
import { CategorieQuestionService } from '@services/serviceCategorieQuestion/categorie-question.service';

@Component({
  selector: 'app-gestion-categorie-questions',
  templateUrl: './gestion-categorie-questions.component.html',
  styleUrls: ['./gestion-categorie-questions.component.scss']
})
export class GestionCategorieQuestionsComponent implements OnInit {

  private _preconisationGlobale: Observable<PreconisationGlobale[]>;
  private _categorieQuestion: Observable<CategorieQuestion[]>

  @ViewChild('preconisationGlobaleForm') preconisationGlobaleForm: any;
  @ViewChild('errorModal') errorModal: any;
  @ViewChild('categorieQuestionForm') categorieQuestionForm: any;

  public actualPreconisationGlobale: PreconisationGlobale
  public actualCategorieQuestion: CategorieQuestion

  constructor(private questionnaireService: QuestionnaireService,
              private preconisationGlobaleService: PreconisationGlobaleService,
              private categorieQuestionService: CategorieQuestionService,
              private modalService: NgbModal) { }

  ngOnInit(): void {

  }


  ngAfterViewInit(){
    let finalise = new Subject();
    this._preconisationGlobale = this.getAll();
    this._categorieQuestion = this.getAllC();

  }

  getAll(): Observable<PreconisationGlobale[]>{
    let finalise = new Subject();
    let obs = this.questionnaireService.getAllPreconisationGlobale('1');
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



  getAllC(): Observable<CategorieQuestion[]>{
    let finalise = new Subject();
    let obs = this.questionnaireService.getAllCategoriesQuestion('1');
    obs.pipe(takeUntil(finalise)).subscribe((data) =>{
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
    this.actualPreconisationGlobale = new PreconisationGlobale('',0,'');
    this.preconisationGlobaleForm.open('add');
  }

  addC(): void{
    this.actualCategorieQuestion = new CategorieQuestion('','');
    this.categorieQuestionForm.open('add');
  }

  update(event: IListEvent){
    this.actualPreconisationGlobale = event.data;
    this.preconisationGlobaleForm.open('update');
  }

  updateC(event: IListEvent){
    this.actualCategorieQuestion = event.data;
    this.categorieQuestionForm.open('update');
  }

  delete(event: IListEvent){
    this.actualPreconisationGlobale = event.data;
    this.preconisationGlobaleForm.open('delete');
  }

  deleteC(event: IListEvent){
    this.actualCategorieQuestion = event.data;
    this.categorieQuestionForm.open('delete');
  }

  createOrUpdateOrDeleteCategorieQuestion(event: IListEvent){
    this._categorieQuestion = null;
    let finalise = new Subject();
    let obs = null;
    if(event.action === 'update'){
      obs = this.categorieQuestionService.update(event.data);
    }else if (event.action === 'add'){
      obs = this.categorieQuestionService.create(event.data);
    }else if(event.action === 'delete'){
      obs = this.categorieQuestionService.delete(event.data);
    }
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
      this._categorieQuestion = this.categorieQuestionService.getAll();
      finalise.next();
      finalise.complete();
    },
    (err) => {
      this.errorModal.open(JSON.stringify(err.error));
      finalise.next();
      finalise.complete();
    });
  }


  createOrUpdateOrDeletePreconisationGlobale(event: IListEvent){
    this._preconisationGlobale = null;
    let finalise = new Subject();
    let obs = null;
    if(event.action === 'update'){
      obs = this.preconisationGlobaleService.update(event.data);
    }else if (event.action === 'add'){
      obs = this.preconisationGlobaleService.create(event.data);
    }else if(event.action === 'delete'){
      obs = this.preconisationGlobaleService.delete(event.data);
    }
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
      this._preconisationGlobale = this.preconisationGlobaleService.getAll();
      finalise.next();
      finalise.complete();
    },
    (err) => {
      this.errorModal.open(JSON.stringify(err.error));
      finalise.next();
      finalise.complete();
    });
  }

  get preconisationGlobales(): Observable<PreconisationGlobale[]> {
    return this._preconisationGlobale;
  }

  get categorieQuestions(): Observable<CategorieQuestion[]> {
    return this._categorieQuestion;
  }

}
