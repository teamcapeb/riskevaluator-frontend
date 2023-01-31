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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  calculateColor = (id : number) => {
    let colors: string[] = environment.evaluerIHM.gradientColors;
    return colors[id%colors.length];
  }

  onSelectCard() {
    // this.router.navigate(["historiques", this.evaluation$.idEvaluation]);
    this.router.navigate(["entreprise", this.entreprise.noSiret]);
  }


}
