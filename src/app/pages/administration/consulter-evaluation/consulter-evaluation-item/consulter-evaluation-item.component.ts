import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { IMetier } from '@/interfaces/IMetier';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { Component, Input, OnInit } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import IEvaluation from "@/interfaces/IEvaluation";
import { Router } from "@angular/router";

@Component({
  selector: 'app-consulter-evaluation-item',
  templateUrl: './consulter-evaluation-item.component.html',
  styleUrls: ['./consulter-evaluation-item.component.scss']
})
export class ConsulterEvaluationItemComponent implements OnInit {

  @Input() evaluation$ : IEvaluation = null;
  @Input() entreprise: IEntreprise;

  thematiques: string[] = [];

  joinedMetiers: string = ''

  constructor(private router: Router, private evaluationService: EvaluationApiService) { }

  ngOnInit(): void {
    this.joinedMetiers = this.joinMetiers(this.entreprise.metiers)
    this.entreprise.evaluations.forEach(evalaluation=>{
      this.evaluationService.get(evalaluation.idEvaluation).subscribe(res => {
        if(!this.includeThematique(this.thematiques,res.scoreCategories[0].categorieQuestion.questionnaire.thematique))
          this.thematiques.push(res.scoreCategories[0].categorieQuestion.questionnaire.thematique);
      })
    })
  }

  includeThematique(themes:string[],theme:string){
    var resultat = false;
    themes.forEach(th=>{
      if(theme==th){
        resultat = true
      }
    })
    return resultat;
  }

  getEvaluation(id: number) {

  }

  onSelectCard() {
    // this.router.navigate(["historiques", this.evaluation$.idEvaluation]);
    this.router.navigate(["entreprise", this.entreprise.noSiret]);
  }

  joinMetiers(metiers: IMetier[] ): string {
      this.joinedMetiers = metiers.map(metier => metier.nomMetier).join(", ")
      return this.joinedMetiers
  }
}
