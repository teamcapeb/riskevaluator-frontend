import { Component, OnInit, Input } from '@angular/core';
import { IDetailsEvaluations } from '@/interfaces/IDetailsEvaluations';
import IEvaluation from '@/interfaces/IEvaluation';
import { ActivatedRoute, Router } from '@angular/router';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { EntrepriseService } from '@services/serviceEntreprise/entreprise.service';
import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { IMetier } from '@/interfaces/IMetier';

@Component({
  selector: 'app-details-entreprise',
  templateUrl: './details-entreprise.component.html',
  styleUrls: ['./details-entreprise.component.scss'],
})
export class DetailsEntrepriseComponent implements OnInit {
  @Input() evaluation: IEvaluation;

  // décalaration des variables

  dataSource: IDetailsEvaluations[];
  displayedColumns: string[] = [];
  entreprise: IEntreprise;
  numSiret: number;
  defaultDateEvaluation = "01/01/2000";

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
    this.getData();
  }

  /**
   * Méthode pour récupérer les données nécessaires à l'affichage
   */
  getData() {
    this.getNoSiret();
    this.entrepriseService.get(this.numSiret).subscribe((res) => {
      this.entreprise = res;
      let listEval = this.getEvaluations();
      this.getAllEvaluation(listEval);
    });
  }

  /**
   * Méthode pour récupérer le numéro de siret de l'entreprise
   */
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
    let evaluation : IDetailsEvaluations[] = [];
    this.evaluationService.getAll().subscribe((res) => {
      let listEvaluationstemp = res;
      let filteredlistEvaluationstemp = listEvaluationstemp.filter(
        (evaluation) => listIdEvaluations.includes(evaluation.idEvaluation)
      );
      filteredlistEvaluationstemp.forEach(element => {
        evaluation.push(this.createDetailsEvalution(element));
      });
      evaluation.sort((a, b) => {
        return b.dateFormat.getTime() - a.dateFormat.getTime();
      });
      this.dataSource = evaluation;
    });
  }

  /**
   * Création des détails évaluations dans le format du type détails évaluations
   */
  createDetailsEvalution(evaluation: IEvaluation): IDetailsEvaluations {
    let detailsEvaluation : IDetailsEvaluations = {
      idEvaluation: null,
      metiers: '',
      questionnaire: '',
      score: null,
      date: '',
      dateFormat: null
    };

    detailsEvaluation.idEvaluation = evaluation.idEvaluation;
    detailsEvaluation.date = evaluation.date?evaluation.date:this.defaultDateEvaluation;
    detailsEvaluation.dateFormat = new Date (evaluation.date?evaluation.date:this.defaultDateEvaluation);
    detailsEvaluation.metiers = this.createListMetiersforDetailsMetiers(evaluation.metiers);
    detailsEvaluation.questionnaire = evaluation.scoreCategories.at(0).categorieQuestion?.questionnaire?.thematique;
    detailsEvaluation.score = evaluation.scoreGeneraleEvaluation;
    return detailsEvaluation;
  }

  createListMetiersforDetailsMetiers(listeMetiers: IMetier[]): string {
    let listeMetiertmp = listeMetiers.map(metier => metier.nomMetier);
    let chaineDeCaracteres = listeMetiertmp.length > 0 ? listeMetiertmp.join(', ') : 'Métiers non définis';
    return chaineDeCaracteres;
  }

  /**
   * Méthode pour accéder à la page détail des évaluations
   * @param idEvaluation :  idEvaluation de l'objet IEvaluation
   */
  goToResult(idEvaluation: number) {
    this.router.navigate(['historiques', idEvaluation]);
  }
}
