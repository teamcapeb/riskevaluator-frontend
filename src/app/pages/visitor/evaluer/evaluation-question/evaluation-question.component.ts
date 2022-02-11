import { Component, Input, OnInit } from "@angular/core";
import { IQuestionType } from "@/interfaces/IQuestionType";
import CategorieQuestion from "@/objects/CategorieQuestion";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IQuestion from "@/interfaces/IQuestion";

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

  selectedReponse: string;

  constructor() {
  }

  ngOnInit(): void {
    this.questionTypeEnum = this.question$?.typeQuestion as IQuestionType;

  }

}
