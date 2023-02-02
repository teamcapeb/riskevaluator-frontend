import { Component, OnInit, Input } from '@angular/core';
import { IDetailsEvaluations } from '@/interfaces/IDetailsEvaluations';
import { DataSource } from '@angular/cdk/table';
import IEvaluation from '@/interfaces/IEvaluation';
import { ActivatedRoute, Router } from '@angular/router';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { EntrepriseService } from '@services/serviceEntreprise/entreprise.service';
import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { concatMap, forkJoin, from, Observable, switchMap, toArray } from 'rxjs';

@Component({
  selector: 'app-details-entreprise',
  templateUrl: './details-entreprise.component.html',
  styleUrls: ['./details-entreprise.component.scss'],
})
export class DetailsEntrepriseComponent implements OnInit {
  @Input() evaluation: IEvaluation;

  dataSource: IDetailsEvaluations[] = [];
  displayedColumns: string[] = [];
  entreprise: IEntreprise;
  numSiret: number;
  allEvaluation: IDetailsEvaluations[] = [];
  detailsEvaluation: IDetailsEvaluations = {
    idEvaluation: null,
    metier: '',
    questionnaire: '',
    score: null,
    date: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private entrepriseService: EntrepriseService,
    private evaluationService: EvaluationApiService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'metier',
      'questionnaire',
      'score',
      'date',
      'action',
    ];
    this.getEntreprise();
  }

  /**
   * Méthode pour récuperer l'entreprise dont on consulte les détails
   */
  getEntreprise() {
    this.getNoSiret();
    this.entrepriseService.get(this.numSiret).subscribe((res) => {
      this.entreprise = res;
      let listEval = this.getEvaluations();
      this.getAllEvaluation(listEval);
    });
  }


  getNoSiret() {
    let noSiretTemp = this.route.snapshot.paramMap.get('noSiret');
    this.numSiret = parseInt(noSiretTemp);
  }

  /**
   * Méthode pour récupérer les identifiants des évaluations lié à l'entreprise
   */
  getEvaluations() {
    let listEvaluations: IEvaluation[] = this.entreprise?.evaluations;
    return listEvaluations;
  }

  /**
   * Création du datasource contenant les details évaluations
   */
  getAllEvaluation(listEvaluations: IEvaluation[]) {
    let listIdEvaluations = listEvaluations.map(
      (evaluation) => evaluation.idEvaluation
    );
    const longueur = listIdEvaluations.length;
    for (let i = 0; i < longueur; i++) {
      this.evaluationService.get(listIdEvaluations[i]).subscribe((res) => {
        this.allEvaluation.push(this.createDetailsEvalution(res));
        this.dataSource = this.allEvaluation;
      });
    }
  }


  /**
   * Création des détails évaluations dans le format du type détails évaluations
   */
  createDetailsEvalution(evaluation: IEvaluation): IDetailsEvaluations {
    this.detailsEvaluation.idEvaluation = evaluation.idEvaluation;
    this.detailsEvaluation.date = '01/01/01';
    this.detailsEvaluation.metier = 'to define';
    this.detailsEvaluation.questionnaire = evaluation.scoreCategories.at(0).categorieQuestion?.questionnaire?.thematique;
    this.detailsEvaluation.score = evaluation.scoreGeneraleEvaluation;
    return this.detailsEvaluation;
  }

  /**
   * Méthode pour accéder à la page détail des évaluations
   * @param idEvaluation :  idEvaluation de l'objet IEvaluation
   */
  goToResult(idEvaluation: number) {
    this.router.navigate(['historiques', idEvaluation]);
  }
}
