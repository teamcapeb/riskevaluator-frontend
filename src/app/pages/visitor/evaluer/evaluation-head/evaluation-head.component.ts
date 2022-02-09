import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-head',
  templateUrl: './evaluation-head.component.html',
  styleUrls: ['./evaluation-head.component.scss']
})
export class EvaluationHeadComponent implements OnInit {
  progressBarValue: any = 10;

  display: any = {
    nomCategorie: " Here is the Title of the Categorie",
    descriptionCategorie: "HERE IS description of the Categorie",
  }

  constructor() { }

  ngOnInit(): void {
  }

}
