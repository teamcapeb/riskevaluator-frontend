import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import Reponse from '@/objects/Reponse';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '@services/serviceQuestion/question.service';
import CategorieQuestion from '../../../../objects/CategorieQuestion';
import Metier from '../../../../objects/Metier';
import { MetierService } from '../../../../services/serviceMetier/metier.service';
import { ToastService } from '../../../../services/serviceToast/toast.service';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import { ModalService } from "@services/serviceModal/modal.service";

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
  selectedItems: Metier[] = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'idMetier',
    textField: 'nomMetier',
    selectAllText: 'Tout',
    unSelectAllText: 'Aucun',
    searchPlaceholderText: 'Chercher',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private questionService: QuestionService,
              private metierService: MetierService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService,
              private toastService: ToastService) {
              }

  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }

  async ngOnInit() {
    this.dropdownList = await this.metierService.getAll().toPromise();
    let idQuestionnaire = this.activatedRoute.snapshot.paramMap.get('idQuestionnaire');
    let idCategorie = this.activatedRoute.snapshot.paramMap.get('idCategorie');
    let idQuestion = this.activatedRoute.snapshot.paramMap.get('idQuestion');
    if(idCategorie && idQuestion && idQuestionnaire){
      this._idQuestionnaire = parseInt(idQuestionnaire);
      this._idQuestion = idQuestion === 'new' ? -1 : parseInt(idQuestion);
      this._idCategorie = parseInt(idCategorie);
    }else{
      this.router.navigate(['/']);
    }
    if(this._idQuestion === -1){
      this.question = new Question(-1, 0, '', '', new CategorieQuestion(this._idCategorie, '').toJSON(), [], []);
    }else {
      this.question = await this.questionService.get(this._idQuestion);

    }
    this.selectedItems = this.question.metiers;
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
    if(!this.question.reponses){
      this.question.reponses = [];
    }
    if(this.question.reponses.length + this._addedReponses.length >= 2 && this.selectedItems.length>0 && this.question.typeQuestion.length>0 && this.question.libelleQuestion.length>0 ){
      this.saved = false;
      this._addedReponses = this.addedReponses.map<Reponse>((reponse: Reponse) => {
        reponse.idReponse = 0;
        return reponse;
      });
      this.question.metiers = this.selectedItems.map((metier: Metier) => {
        return new Metier(metier.idMetier, metier.nomMetier, null);
      });
      this.question.reponses.push(...this.addedReponses);
      let res = null;
      try{
        if(this._idQuestion !== -1){
          res = await this.questionService.update(this.question);
        }else{
          res = await this.questionService.create(this.question);
        }
        this.saved = true;
        this.router.navigate(['gestion-questionnaires', this._idQuestionnaire ,'gestion-categories-questions', this._idCategorie ,'gestion-questions']);
      }catch(error){
        if( error.status === 409 ){
          this.modalService.error('La question ou les réponses ajoutées existent déjà !');
        }
        this.router.navigate(['gestion-questionnaires', this._idQuestionnaire ,'gestion-categories-questions', this._idCategorie ,'gestion-questions']);
      }
    }else{
      var wErreurMessage="";
      if(this.question.libelleQuestion.length==0){
        wErreurMessage+="* le libelle ne doit pas etre vide\n"
      }
      if(this.question.typeQuestion.length==0 ){
        wErreurMessage+="* vous devez choisir un type de question\n"
      }
      if(this.selectedItems.length==0 ){
        wErreurMessage+="* vous devez choisir au moin un metier qui concerne la question\n"
      }
      if(this.question.reponses.length + this._addedReponses.length < 2 ){
        wErreurMessage+='* Il doit y avoir 2 réponses minimum'
      }

      this.modalService.error(wErreurMessage);
    }
  }

  back(){
    this.router.navigate(['gestion-questionnaires', this._idQuestionnaire ,'gestion-categories-questions', this._idCategorie ,'gestion-questions']);
  }

  createOrUpdateOrDeleteReponse(event: IListEvent){
    event.data.question = new Question(this._idQuestion, 0, '', '', null, [], []);
    if(event.action === 'update'){
    }else if (event.action === 'add'){
      event.data.idReponse = this._idConteur.toString();

      this._addedReponses.push(event.data);
      this._idConteur++;
      if(this._addedReponses.length === 0){
        this._idConteur = 0;
      }
    }else if(event.action === 'delete'){
      this.question.reponses = this.question.reponses.filter(({ idReponse }) => idReponse !== event.data.idReponse);
      this._addedReponses = this._addedReponses.filter(({ idReponse }) => idReponse !== event.data.idReponse);
    }
  }

  get reponses(): Reponse[]{
    return this._reponses;
  }
  get addedReponses(): Reponse[]{
    return this._addedReponses;
  }

  get idQuestion(): number {
    return this._idQuestion;
  }

}
