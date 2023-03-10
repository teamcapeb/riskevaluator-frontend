import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { IMetier } from '@/interfaces/IMetier';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { Component, Input, OnInit } from "@angular/core";
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

  joinedMetiers: string = '';
  constructor(private router: Router, private evaluationService: EvaluationApiService) { }

  ngOnInit(): void {
    this.joinedMetiers = this.joinMetiers(this.entreprise.metiers);
  }

  onSelectCard() {
    this.router.navigate(["entreprise", this.entreprise.noSiret]);
  }

  joinMetiers(metiers: IMetier[] ): string {
    metiers = this.trierMetiers(metiers);
    let joinedMetierListeTemp : String [] = [];
    let joinedMetierTemp : String ='';
    metiers.forEach(element => {
      joinedMetierTemp = joinedMetierTemp+element.nomMetier;
      if(joinedMetierTemp.length<42){
        joinedMetierListeTemp.push(element.nomMetier);
      }else{
        joinedMetierListeTemp.push('...');
      }
    });
    this.joinedMetiers = joinedMetierListeTemp.join(", ");
    return this.joinedMetiers;
  }

  trierMetiers(metiers: IMetier[]): IMetier[] {
    return metiers.sort(
      (a, b) => {
        if (a.nomMetier.toUpperCase() < b.nomMetier.toUpperCase()) {
          return -1;
        }
        if (a.nomMetier.toUpperCase() > b.nomMetier.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
  }
}
