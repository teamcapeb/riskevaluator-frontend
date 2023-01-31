import { Component, OnInit } from '@angular/core';
import {IDetailsEvaluations} from '@/interfaces/IDetailsEvaluations'
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-details-entreprise',
  templateUrl: './details-entreprise.component.html',
  styleUrls: ['./details-entreprise.component.scss']
})
export class DetailsEntrepriseComponent implements OnInit {

  dataSource : IDetailsEvaluations[];
  displayedColumns: string[] = [];
  entreprise : String;

  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns = ['metier', 'questionnaire', 'score', 'date', 'action'];
    this.getEvaluation();
    this.entreprise ='CAPEB';
  }

  getEvaluation(){
    let EVALUATION_DATA: IDetailsEvaluations[] = [
      {idEvaluation:1, metier: 'Hydrogen', questionnaire:'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Helium', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Lithium', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Beryllium', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Boron', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Carbon', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'}
    ];
    this.dataSource = EVALUATION_DATA;
  }

}
