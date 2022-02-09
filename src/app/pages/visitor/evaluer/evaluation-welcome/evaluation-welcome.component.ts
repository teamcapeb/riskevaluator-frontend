import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-evaluation-welcome',
  templateUrl: './evaluation-welcome.component.html',
  styleUrls: ['./evaluation-welcome.component.scss']
})
export class EvaluationWelcomeComponent implements OnInit {
  introDisplay = environment.evaluerIHM.introDisplay;

  constructor() { }

  ngOnInit(): void {
  }

}
