import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { CategorieQuestionService } from '@services/serviceCategorieQuestion/categorie-question.service';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { IMetier } from '@/interfaces/IMetier';
import IQuestionnaire from '@/interfaces/IQuestionnaire';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MetierService } from '@services/serviceMetier/metier.service';
import { EntrepriseService } from '@services/serviceEntreprise/entreprise.service';
import ICategorieQuestion from '@/interfaces/ICategorieQuestion';
import IEvaluation from '@/interfaces/IEvaluation';
import { tuiSum } from '@taiga-ui/cdk';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  entrepriseControl = new FormControl('');
  metierControl = new FormControl('');
  questionnaireControl = new FormControl('');

  allEvaluations: IEvaluation[];
  allEntreprises : IEntreprise[];
  allMetiers : IMetier[];
  allQuestionnaires : IQuestionnaire[];
  allCategories: ICategorieQuestion[];
  allCategoriesLibelles: string[];

  filteredEntreprises : IEntreprise[] = [];

  entreprisesFiltrer : IEntreprise[]=[];
  filteredEvaluations: IEvaluation[] = [];
  filteredMetiers : IMetier[] = [];
  filteredQuestionnaires : IQuestionnaire[] = [];

  constructor(private evaluationService: EvaluationApiService,
              private entrepriseService: EntrepriseService,
              private metierService: MetierService,
              private questionnaireService: QuestionnaireService,
              private categorieQuestionService: CategorieQuestionService) { }

  ngOnInit(): void {
    this.evaluationService.getAll().subscribe((res) => {
      this.allEvaluations = res;
      this.filteredEvaluations = res;
    })
    this.entrepriseService.getAll().subscribe((res) => {
      this.allEntreprises = this.sortEntreprises(res);
      this.filteredEntreprises = [...this.allEntreprises];
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.allMetiers = this.sortMetiers(res);
      this.filteredMetiers = this.allMetiers;
    });
    this.questionnaireService.getAllQuestionnaires().subscribe((res) => {
      this.allQuestionnaires = this.sortQuestionnaires(res);
      this.filteredQuestionnaires = this.allQuestionnaires;
    });
    this.categorieQuestionService.getAll().subscribe((res) => {
      this.allCategories = res;
      this.allCategoriesLibelles = res.map((categorie => {
        return categorie.libelle;
      }));
    });
  }



  sortEntreprises(entreprises: IEntreprise[]): IEntreprise[] {
    return entreprises.sort(
      (a, b) => {
        if (a.nomEntreprise.toUpperCase() < b.nomEntreprise.toUpperCase()) {
          return -1;
        }
        if (a.nomEntreprise.toUpperCase() > b.nomEntreprise.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
  }

  sortMetiers(metiers: IMetier[]): IMetier[] {
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

  sortQuestionnaires(questionnaires: IQuestionnaire[]): IQuestionnaire[] {
    return questionnaires.sort(
      (a, b) => {
        if (a.thematique.toUpperCase() < b.thematique.toUpperCase()) {
          return -1;
        }
        if (a.thematique.toUpperCase() > b.thematique.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
  }

  selectEntreprise(entreprise: any, select: any) {
    if (select) {
      if (this.entrepriseControl.value.length == 1) {
        this.filteredEntreprises = []
      }
      this.allEntreprises.forEach(etp => {
        this.entrepriseControl.value.forEach((nom: any) => {
          if (etp.noSiret == entreprise.noSiret && etp.nomEntreprise === nom && !this.filteredEntreprises.includes(etp)) {
            this.filteredEntreprises.push(etp);
          }
        });
      });
    } else {
      this.filteredEntreprises.forEach((element,index) => {
        if (element.noSiret == entreprise.noSiret) {
          this.filteredEntreprises.splice(index, 1);
        }
      });
      if (this.entrepriseControl.value.length == 0) {
        this.filteredEntreprises = [...this.allEntreprises]
      }
    }
  }

  selectMetier() {
    this.filteredMetiers = [];
    this.allMetiers.forEach(mtr => {
      this.metierControl.value.forEach((nom: any) => {
        if (mtr.nomMetier === nom && !this.filteredMetiers.includes(mtr)) {
          this.filteredMetiers.push(mtr);
        }
      });
    });
    if(this.metierControl.value.length == 0){
      this.filteredMetiers = this.allMetiers;
    }
  }
}
