import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { IMetier } from '@/interfaces/IMetier';
import IQuestionnaire from '@/interfaces/IQuestionnaire';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MetierService } from '@services/serviceMetier/metier.service';
import { EntrepriseService } from '@services/serviceEntreprise/entreprise.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  entrepriseControl = new FormControl('');
  metierControl = new FormControl('');
  questionnaireControl = new FormControl('');
  filteredEntreprises : IEntreprise[];
  filteredMetiers : IMetier[];
  filteredQuestionnaires : IQuestionnaire[];

  constructor(private entrepriseService: EntrepriseService,
              private metierService: MetierService,
              private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    this.entrepriseService.getAll().subscribe((res) => {
      this.filteredEntreprises = res;
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.filteredMetiers = res;
    });
    // this.questionnaireService.getAll().subscribe((res) => {
    //   this.filteredQuestionnaires = res;
    // });
  }

}
