import { Component, Input, OnInit } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import IMetier from "@/interfaces/IMetier";
import IEvaluation from "@/interfaces/IEvaluation";
import { Router } from "@angular/router";

@Component({
  selector: 'app-consulter-evaluation-item',
  templateUrl: './consulter-evaluation-item.component.html',
  styleUrls: ['./consulter-evaluation-item.component.scss']
})
export class ConsulterEvaluationItemComponent implements OnInit {

  @Input() evaluation$ : IEvaluation = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  calculateColor = (id : number) => {
    let colors: string[] = environment.evaluerIHM.gradientColors;
    return colors[id%colors.length];
  }
}
