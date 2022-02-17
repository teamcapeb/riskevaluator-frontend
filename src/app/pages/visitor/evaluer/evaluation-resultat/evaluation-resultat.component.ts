import IEvaluation from '@/interfaces/IEvaluation';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import IPreconisationGlobale from "@/interfaces/IPreconisationGlobale";
import IScoreCategory from '@/interfaces/IScoreCategory';

import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInUpOnEnterAnimation
} from 'angular-animations';

@Component({
  selector: 'app-evaluation-resultat',
  templateUrl: './evaluation-resultat.component.html',
  styleUrls: ['./evaluation-resultat.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
  ]

})
export class EvaluationResultatComponent implements OnInit {

  evaluation$ : IEvaluation;

  precoGlobale$ : IPreconisationGlobale[];
  listScoreCategories$ : IScoreCategory[];
  constructor(private route : Router,
              private evalTokenStorageService : EvalTokenStorageService) {

  }

  ngOnInit(): void {
    this.evaluation$ = this.evalTokenStorageService.getEvaluation();

      let questionnaire: IQuestionnaire = this.evaluation$?.scoreCategories?.at(0)?.categorie?.questionnaire;
      this.precoGlobale$ = questionnaire?.preconisationGlobales?.filter(p=> p?.viewIfPourcentageScoreLessThan > this.evaluation$?.scoreGeneraleEvaluation);

      this.listScoreCategories$ = this.evaluation$.scoreCategories.map( cat => {
        let temp = cat.categorie.preconisationsCategorie;
        cat.categorie.preconisationsCategorie = temp.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
        return cat;
      })
  }

}
