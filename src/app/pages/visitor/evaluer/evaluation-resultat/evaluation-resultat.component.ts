import IEvaluation from '@/interfaces/IEvaluation';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import IPreconisationCategorieQuestion from "@/interfaces/IPreconisationCategorieQuestion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  constructor( private evalTokenStorageService : EvalTokenStorageService) {}

  ngOnInit(): void {
       this.evaluation$ = this.evalTokenStorageService.getEvaluation();


       if(this.evaluation$!=null) {


         const textReducer = (previousValue: string, currentValue: IPreconisationGlobale | IPreconisationCategorieQuestion) => previousValue.concat('\n \n',currentValue.contenu);

         // Take questionnaire from one the scoreCategories
         let questionnaire: IQuestionnaire = this.evaluation$?.scoreCategories?.at(0)?.categorie?.questionnaire;

         // filter preconisation with respect the viewIfpercentage
         const tempPreco : IPreconisationGlobale[] = questionnaire?.preconisationGlobales?.filter(p=> p?.viewIfPourcentageScoreLessThan > this.evaluation$?.scoreGeneraleEvaluation);

         // take one of the Globale preconisation
         this.precoGlobale$ = tempPreco?.find(el => el !== undefined)

         // concatenate contenu of all global preconisation to one
         if( this.precoGlobale$ != null && this.precoGlobale$?.contenu !==null)
         this.precoGlobale$.contenu = tempPreco?.reduce(textReducer,"");

         this.listScoreCategories$ = this.evaluation$.scoreCategories.map( cat => {
           let temp = cat.categorie.preconisationsCategorie;
           cat.categorie.preconisationsCategorie = temp.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
           return cat;
         })
       }

  }


  concatPreconisations(preconisation :any) : string {
    const textReducer = (previousValue: string, currentValue: IPreconisationGlobale | IPreconisationCategorieQuestion) => previousValue.concat('\n \n',currentValue.contenu);
    return preconisation.reduce(textReducer,"");
  }

  htmlToPng() {
    const input = document.getElementById("wrapper");
    html2canvas(input).then(canvas => {
      var link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = this.precoGlobale$?.questionnaire?.thematique;
      document.body.appendChild(link);
      link.click();
    });

  }
  htmlToPdf() {

    const input = document.getElementById("wrapper");
    html2canvas(input).then(canvas => {
      var img = canvas.toDataURL();
      // jspdf changes
      var pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(img, 'JPEG', 20,0, 150, 280 );

      pdf.save(`${this.precoGlobale$?.questionnaire?.thematique}.pdf`);
    });

  }




}
