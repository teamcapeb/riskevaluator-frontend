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

  joinedMetiers: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.joinedMetiers = this.joinMetiers(this.entreprise.metiers)
  }

  calculateColor = (id : number) => {
    let colors: string[] = environment.evaluerIHM.gradientColors;
    return colors[id%colors.length];
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
