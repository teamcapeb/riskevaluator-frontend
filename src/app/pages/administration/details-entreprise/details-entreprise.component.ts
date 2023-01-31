import { Component, OnInit, Input } from '@angular/core';
import {IDetailsEvaluations} from '@/interfaces/IDetailsEvaluations'
import { DataSource } from '@angular/cdk/table';
import IEvaluation from "@/interfaces/IEvaluation";
import { Router } from "@angular/router";

@Component({
  selector: 'app-details-entreprise',
  templateUrl: './details-entreprise.component.html',
  styleUrls: ['./details-entreprise.component.scss']
})
export class DetailsEntrepriseComponent implements OnInit {

  dataSource : IDetailsEvaluations[];
  displayedColumns: string[] = [];
  entreprise : String;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.displayedColumns = ['metier', 'questionnaire', 'score', 'date', 'action'];
    this.getEvaluation();
    this.entreprise ='CAPEB';
  }

  /**
   * TODO : récuperation des evaluations d'un entreprise à partir d'un endpoint
   * surement revoir la structure de l'objet
   */
  getEvaluation(){
    let EVALUATION_DATA: IDetailsEvaluations[] = [
      {idEvaluation:13, metier: 'Hydrogen', questionnaire:'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:11, metier: 'Helium', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Lithium', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Beryllium', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Boron', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'},
      {idEvaluation:1, metier: 'Carbon', questionnaire: 'questionnaire1', score: 1, date: '02/09/2020'}
    ];
    this.dataSource = EVALUATION_DATA;
  }

  /**
   * Méthode pour accéder à la page détail des évaluations
   * @param idEvaluation :  idEvaluation de l'objet IEvaluation
  * TODO
   */
  goToResult(idEvaluation: number){
    this.router.navigate(["historiques", idEvaluation]);
  }
}
