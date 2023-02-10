import { QuestionService } from '@services/serviceQuestion/question.service';
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
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
  questionTypeEnum : IQuestionType;
  isSelected : boolean = false;

  selectedReponse : IReponse = {isChecked : false}

  constructor(private questionService : QuestionService) {
  }

  ngOnInit(): void {
    this.questionTypeEnum = this.question$?.typeQuestion as IQuestionType;
  }

  radioChange(event: any) {
    console.log(event);
    this.question$?.reponses?.forEach(item => {
      if(item.idReponse === event.value.idReponse) {
        item.isChecked = true;
      }else {
        item.isChecked = false;
      }
    })
    if(this.isSelected == false){
      this.questionService.numberChecked++;
      this.isSelected = true;
    }
  }

  checkBoxChange(event: any) {
    if (event.checked) {
      this.questionService.numberChecked++;
    }
    else {
      this.questionService.numberChecked--;
    }
  }
}
