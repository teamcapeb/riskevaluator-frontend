import CategorieQuestion from "@/objects/CategorieQuestion";
import { DataStateEnum } from "@/state/questionnaire.state";
import { Component, Input, OnInit } from "@angular/core";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-evaluation-head',
  templateUrl: './evaluation-head.component.html',
  styleUrls: ['./evaluation-head.component.scss']
})
export class EvaluationHeadComponent implements OnInit {

  @Input() categorieQuestion$: ICategorieQuestion;

  DataStateEnum = DataStateEnum;

  progressBarValue: any = 0;

  constructor(public evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.evaluationService.actualCategorieNumberObs.subscribe(state =>  {
      if(state.max > 0)
        this.progressBarValue =  ((state.current)/ (state.max-1)) *100 ;
    })
  }
  calculateColor = (id : number) => {
    let colors: string[] = environment.evaluerIHM.gradientColors;
    return colors[id%colors.length];
  }
}
