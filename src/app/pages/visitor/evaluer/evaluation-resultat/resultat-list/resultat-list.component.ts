import { Component, Input, OnInit } from "@angular/core";
import IEvaluation from "@/interfaces/IEvaluation";
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";
import IPreconisationGlobale from "@/interfaces/IPreconisationGlobale";
import IPreconisationCategorieQuestion from "@/interfaces/IPreconisationCategorieQuestion";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import IScoreCategory from "@/interfaces/IScoreCategory";
import { bounceInOnEnterAnimation } from "angular-animations";
import { QuestionnaireService } from "@services/serviceQuestionnaire/questionnaire.service";

@Component({
  selector: 'app-resultat-list',
  templateUrl: './resultat-list.component.html',
  styleUrls: ['./resultat-list.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
  ]
})
export class ResultatListComponent implements OnInit {
  @Input() evaluation$ : IEvaluation = null;
  precoGlobale$ : IPreconisationGlobale = { idPreconisationG: 0, viewIfPourcentageScoreLessThan: 0, contenu: ""};
  listScoreCategories$ : IScoreCategory[];

  constructor(private evalTokenStorageService : EvalTokenStorageService,
              private questionnaireService : QuestionnaireService) {}

  ngOnInit(): void {
    this.preparePrecoGlobale();
    this.preparePrecoCategorieList();
  }

  preparePrecoCategorieList() {
    if (this.evaluation$ != null) {

      // Take questionnaire from one the scoreCategories
      let questionnaire: IQuestionnaire;
      this.questionnaireService.get(this.evaluation$?.scoreCategories?.at(0)?.categorieQuestion?.questionnaire.idQuestionnaire).subscribe(res =>{
        questionnaire = res.toJSON();

      // filter preconisation with respect the viewIfpercentage
      const tempPreco: IPreconisationGlobale[] = questionnaire?.preconisationGlobales?.filter(p => p?.viewIfPourcentageScoreLessThan > this.evaluation$?.scoreGeneraleEvaluation);

      // take one of the Globale preconisation
      this.precoGlobale$ = tempPreco?.find(el => el !== undefined)

      // concatenate contenu of all global preconisation to one
      if (this.precoGlobale$ != null && this.precoGlobale$?.contenu !== null)
        this.precoGlobale$.contenu = this.concatPreconisations(tempPreco);
    });
  }
}

  preparePrecoGlobale(){
    if(this.evaluation$!=null) {
      this.listScoreCategories$ = this.evaluation$?.scoreCategories?.map( cat => {
        let temp = cat.categorieQuestion.preconisationsCategorie;
        cat.categorieQuestion.preconisationsCategorie = temp.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
        return cat;
      })
    }
  }

  concatPreconisations(preconisation :any) : string {
    const textReducer = (previousValue: string, currentValue: IPreconisationGlobale | IPreconisationCategorieQuestion) => previousValue.concat('\n \n',currentValue.contenu);
    return preconisation.reduce(textReducer,"");
  }

  concat(preconisation : IPreconisationCategorieQuestion[]) : string{
    let libelle : string[] =[...new Set( preconisation.map(item => item.contenu))];
    return libelle.join('\n \n');
  }
}
