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
import { IOopsMessageInput, OopsMessageComponent } from "@components/oops-message/oops-message.component";

@Component({
  selector: 'app-evaluation-resultat',
  templateUrl: './evaluation-resultat.component.html',
  styleUrls: ['./evaluation-resultat.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
  ]

})
export class EvaluationResultatComponent implements OnInit {

  evaluation$ : IEvaluation = null;

  precoGlobale$ : IPreconisationGlobale = { idPreconisationG: 0, viewIfPourcentageScoreLessThan: 0, contenu: ""};
  listScoreCategories$ : IScoreCategory[];


  oopsMessage: IOopsMessageInput  = {
    buttonText: "aller vers evaluation",
    goToUrl: "/evaluer",
    message: "Merci d'aller sur la rubrique évaluer, pour effectuer une évaluation",
    title: "Aucune évaluation n'est trouvée", }

  constructor(private route : Router,
              private evalTokenStorageService : EvalTokenStorageService) {

  }

  ngOnInit(): void {
       this.evaluation$ = this.evalTokenStorageService.getEvaluation();


       if(this.evaluation$!=null) {
         const textReducer = (previousValue: string, currentValue: IPreconisationGlobale) => previousValue.concat('\n \n',currentValue.contenu);
         let questionnaire: IQuestionnaire = this.evaluation$?.scoreCategories?.at(0)?.categorie?.questionnaire;
         const tempPreco : IPreconisationGlobale[] = questionnaire?.preconisationGlobales?.filter(p=> p?.viewIfPourcentageScoreLessThan > this.evaluation$?.scoreGeneraleEvaluation);

         this.precoGlobale$ = tempPreco?.find(el => el !== undefined)

         if( this.precoGlobale$ != null && this.precoGlobale$?.contenu !==null)
         this.precoGlobale$.contenu = tempPreco?.reduce(textReducer,"");

         this.listScoreCategories$ = this.evaluation$.scoreCategories.map( cat => {
           let temp = cat.categorie.preconisationsCategorie;
           cat.categorie.preconisationsCategorie = temp.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
           return cat;
         })

       }

  }



}
