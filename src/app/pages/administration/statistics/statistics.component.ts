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
  filteredEntreprises : IEntreprise[];
  filteredMetiers : IMetier[];
  filteredQuestionnaires : IQuestionnaire[];
  filteredCategories: ICategorieQuestion[];
  filteredCategoriesLibelles: string[];

  readonly value = [40, 30, 20, 10];

  constructor(private entrepriseService: EntrepriseService,
              private metierService: MetierService,
              private questionnaireService: QuestionnaireService,
              private categorieQuestionService: CategorieQuestionService) { }

  ngOnInit(): void {
    this.entrepriseService.getAll().subscribe((res) => {
      this.filteredEntreprises = res;
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.filteredMetiers = res;
    });
    this.questionnaireService.getAllQuestionnaires().subscribe((res) => {
      this.filteredQuestionnaires = res;
    });
    this.categorieQuestionService.getAll().subscribe((res) => {
      this.filteredCategories = res;
      this.filteredCategoriesLibelles = res.map((categorie => {
        return categorie.libelle;
      }));
    });
  }
}
