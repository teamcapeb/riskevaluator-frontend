import { Component, Input, OnInit } from "@angular/core";
import { CategorieNumberAction, EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";

@Component({
  selector: 'app-evaluation-footer',
  templateUrl: './evaluation-footer.component.html',
  styleUrls: ['./evaluation-footer.component.scss']
})
export class EvaluationFooterComponent implements OnInit {
  @Input() categorieQuestion$: ICategorieQuestion;
  @Input() categoriesQuestions$ : ICategorieQuestion[]

  constructor(private evaluationService: EvaluationService) { }


  ngOnInit(): void {
  }

  previousButtonClick() {
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.DECREASE)
  }

  disableNextButton() {
    return false;
  }

  finishButtonClick(){
    this.evaluationService.onCalculateScore(this.categoriesQuestions$);
  }

  nextButtonClick() {
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.INCREASE);
  }
}
