import { Component, Input, OnInit } from "@angular/core";
import { IQuestionType } from "@/interfaces/IQuestionType";
import IQuestion from "@/interfaces/IQuestion";
import IReponse from "@/interfaces/IReponse";

@Component({
  selector: 'app-evaluation-question',
  templateUrl: './evaluation-question.component.html',
  styleUrls: ['./evaluation-question.component.scss']
})
export class EvaluationQuestionComponent implements OnInit {
  @Input() question$: IQuestion;

  aide:string = "Here should be aide tip"
  readonly QuestionType=IQuestionType;
  questionTypeEnum : IQuestionType

  selectedReponse : IReponse = {isChecked : false}

  constructor() {
  }

  ngOnInit(): void {
    this.questionTypeEnum = this.question$?.typeQuestion as IQuestionType;

  }

  radioChange(event: any) {
    this.question$?.reponses?.forEach(item => {
      if(item.idReponse === event.value.idReponse) {
        item.isChecked = true;
      }else {
        item.isChecked = false;
      }
    } )
  }

}
