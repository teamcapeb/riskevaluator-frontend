import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import Reponse from '@/objects/Reponse';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '@services/serviceQuestion/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieQuestionService } from '@services/serviceCategorieQuestion/categorie-question.service';
import CategorieQuestion from '../../../../objects/CategorieQuestion';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Metier from '../../../../objects/Metier';
import { MetierService } from '../../../../services/serviceMetier/metier.service';

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
  private _idQuestion: number;
  private _idCategorie: number;
  private _idQuestionnaire: number;
  public saved: boolean = true;
  public question: Question = new Question(-1, 0, '', '', null, [], []);
  public actualReponse: Reponse;
  @ViewChild('reponseForm') reponseForm: any;
  @ViewChild('errorModal') errorModal: any;

  public dropdownList: Metier[] = [
  ];
  selectedItems: any[] = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'idMetier',
    textField: 'nomMetier',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private questionService: QuestionService,
              private metierService: MetierService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 

              }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  async ngOnInit() {
    this.dropdownList = await this.metierService.getAll().toPromise();
    let idQuestionnaire = this.activatedRoute.snapshot.paramMap.get('idQuestionnaire');
    let idCategorie = this.activatedRoute.snapshot.paramMap.get('idCategorie');
    let idQuestion = this.activatedRoute.snapshot.paramMap.get('idQuestion');
    if(idCategorie && idQuestion && idQuestionnaire){
      this._idQuestionnaire = parseInt(idCategorie);
      this._idQuestion = idQuestion === 'new' ? -1 : parseInt(idQuestion);
      this._idCategorie = parseInt(idCategorie);
    }else{
      this.router.navigate(['/']);
    }
    if(this._idQuestion === -1){
      this.question = new Question(-1, 0, '', '', new CategorieQuestion(this._idCategorie, '').toJSON(), [], []);
    }else {
        this.questionService.get(this._idQuestion).then((question: Question) => {
          this.question = question;
        }).catch((reason: any) => {
          console.error(reason);
        });
      
    }
    this._addedReponses = [];
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
    if(!this.question.reponses){
      this.question.reponses = [];
    }
    this.question.reponses.push(...this.addedReponses);
    let res = null;
    try{
      if(this._idQuestion !== -1){
        this.question.metiers = [];
        console.log(this.question);
        res = await this.questionService.update(this.question);
      }else{
        console.log(this.question);
        res = await this.questionService.create(this.question);
      }
      this.saved = true;
      this.router.navigate(['gestion-questionnaires', this._idQuestionnaire ,'gestion-categories-questions', this._idCategorie ,'gestion-questions']);
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
