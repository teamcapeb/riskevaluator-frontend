import IListEvent from '@/interfaces/IListEvent';
import Question from '@/objects/Question';
import Reponse from '@/objects/Reponse';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '@services/serviceQuestion/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  public closeResult = '';
  public title: string;
  public question: Question;
  private _reponses: Reponse[];
  public actualReponse: Reponse;
  @ViewChild('reponseForm') reponseForm: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(private modalService: NgbModal, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.question = new Question('1', 'un type', 'Comment ca va ?', []);
    this.questionService.getAllReponses('1').subscribe((reponses: Reponse[]) => {
      this._reponses = reponses;
    });
  }

  add(): void{
    //this.actualMetier = new Metier('', '');
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

  get reponses(): Reponse[]{
    return this._reponses;
  }

}
