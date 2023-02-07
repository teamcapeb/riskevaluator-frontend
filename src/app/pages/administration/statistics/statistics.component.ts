import { EvaluationApiService } from '@services/serviceEvaluation/evaluation-api.service';
import { CategorieQuestionService } from '@services/serviceCategorieQuestion/categorie-question.service';
import { QuestionnaireService } from '@services/serviceQuestionnaire/questionnaire.service';
import { IEntreprise } from '@/interfaces/IEntreprise';
import { IMetier } from '@/interfaces/IMetier';
import IQuestionnaire from '@/interfaces/IQuestionnaire';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MetierService } from '@services/serviceMetier/metier.service';
import { EntrepriseService } from '@services/serviceEntreprise/entreprise.service';
import ICategorieQuestion from '@/interfaces/ICategorieQuestion';
import IEvaluation from '@/interfaces/IEvaluation';
import { TuiContextWithImplicit, tuiSum } from '@taiga-ui/cdk';
import { tuiFormatNumber } from '@taiga-ui/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  public isExpanded1 = false;
  public isExpanded2 = false;
  public isExpanded3 = false;
  public isExpanded4 = false;
  public hide1 = false;
  public hide2 = false;
  public hide3 = false;
  public hide4 = false;
  public expand1Counter = 0;
  public expand2Counter = 0;
  public expand3Counter = 0;
  public expand4Counter = 0;

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
  filteredEvaluations: IEvaluation[] = [];
  filteredMetiers : IMetier[] = [];
  filteredQuestionnaires : IQuestionnaire[] = [];

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  petitesEntreprises: IEntreprise[] = [];
  moyennesEntreprises: IEntreprise[] = [];
  grandesEntreprises: IEntreprise[] = [];

  scoreMoyenPetitesEntreprises: number = 0;
  scoreMoyenMoyennesEntreprises: number = 0;
  scoreMoyenGrandesEntreprises: number = 0;

  graph1LabelsX: string[] = ["Petites", "Moyennes", "Grandes"];
  graph1LabelsY: string[] = ["0", "100"];

  value: number[][] = [];

  readonly appearances = ['onDark', 'error'];
  appearance = 'onDark';
  readonly hint = ({$implicit}: TuiContextWithImplicit<number>): string => {
    let result = '';
    this.value.forEach((set) => {
      result += set[$implicit] + '\n';
    });
    console.log(result);
    return result.trim();
  };

  constructor(private evaluationService: EvaluationApiService,
              private entrepriseService: EntrepriseService,
              private metierService: MetierService,
              private questionnaireService: QuestionnaireService,
              private categorieQuestionService: CategorieQuestionService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.evaluationService.getAll().subscribe((res) => {
      this.allEvaluations = res;
      this.filteredEvaluations = res;
      this.cdr.detectChanges();
    })
    this.entrepriseService.getAll().subscribe((res) => {
      this.allEntreprises = this.sortEntreprises(res);
      this.filteredEntreprises = [...this.allEntreprises];
      this.separateEntreprisesEffectif(this.filteredEntreprises);
      this.cdr.detectChanges();
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.allMetiers = this.sortMetiers(res);
      this.filteredMetiers = this.allMetiers;
      this.cdr.detectChanges();
    });
    this.questionnaireService.getAllQuestionnaires().subscribe((res) => {
      this.allQuestionnaires = this.sortQuestionnaires(res);
      this.filteredQuestionnaires = this.allQuestionnaires;
      this.cdr.detectChanges();
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

  selectEntreprise(entreprise: IEntreprise, selected: boolean) {
    if (selected) {
      if (this.entrepriseControl.value.length == 1) {
        this.filteredEntreprises = []
      }
      this.allEntreprises.forEach(etp => {
        this.entrepriseControl.value.forEach((nom: string) => {
          if (etp.noSiret == entreprise.noSiret && etp.nomEntreprise === nom && !this.filteredEntreprises.includes(etp)) {
            this.filteredEntreprises.push(etp);
          }
        });
      });
      this.updateFilteredMetiersByEntreprises();
      this.updateFilteredEvaluationsByEntreprises();
    } else {
      this.filteredEntreprises.forEach((element,index) => {
        if (element.noSiret == entreprise.noSiret) {
          this.filteredEntreprises.splice(index, 1);
          this.updateFilteredMetiersByEntreprises();
          this.updateFilteredEvaluationsByEntreprises();
        }
      });
      if (this.entrepriseControl.value.length == 0) {
        this.filteredEntreprises = [...this.allEntreprises];
        this.filteredMetiers = [...this.allMetiers];
        this.filteredEvaluations = [...this.allEvaluations];
      }
    }
    this.separateEntreprisesEffectif(this.filteredEntreprises);
  }

  selectMetier(metier: IMetier, selected: boolean) {
    if (selected) {
      this.filteredMetiers = [];
      this.allMetiers.forEach(mtr => {
        this.metierControl.value.forEach((nom: string) => {
          if (mtr.nomMetier === nom && !this.filteredMetiers.includes(mtr)) {
            this.filteredMetiers.push(mtr);
          }
        });
      });
      this.updateFilteredEntreprisesByMetiers();
    }
    else {
      this.filteredMetiers.forEach((element,index) => {
        if (element.nomMetier == metier.nomMetier) {
          this.filteredMetiers.splice(index, 1);
          this.updateFilteredEntreprisesByMetiers();
        }
      });
      if (this.metierControl.value.length == 0) {
        this.filteredMetiers = [...this.allMetiers];
        this.filteredEntreprises = [...this.allEntreprises];
        this.filteredEvaluations = [...this.allEvaluations];
      }
    }
    this.separateEntreprisesEffectif(this.filteredEntreprises);
  }

  separateEntreprisesEffectif(entreprises: IEntreprise[]) {
    this.petitesEntreprises = [];
    this.moyennesEntreprises = [];
    this.grandesEntreprises = [];
    entreprises.forEach((etp) => {
      if (etp.effectif <= 5) {
        this.petitesEntreprises.push(etp);
      }
      else if (etp.effectif >= 6 && etp.effectif <= 10) {
        this.moyennesEntreprises.push(etp);
      }
      else if (etp.effectif > 10) {
        this.grandesEntreprises.push(etp);
      }
    });
    console.log(this.petitesEntreprises.length + " " + this.moyennesEntreprises.length + " " + this.grandesEntreprises.length);
    this.scoresMoyensTailleEntreprises();
  }

  scoresMoyensTailleEntreprises() {
    let sumScorePetites: number = 0;
    let sumScoreMoyennes: number = 0;
    let sumScoreGrandes: number = 0;

    let evalsEntreprise: IEvaluation[] = [];

    let dates : string[] = [];

    this.petitesEntreprises.forEach((etp) => {
      sumScorePetites += etp.evaluations.map((evl) => {
        // TODO
        return evl.scoreGeneraleEvaluation
      }).reduce((total, num) => total + num, 0);
    });
    this.moyennesEntreprises.forEach((etp) => {
      sumScoreMoyennes += etp.evaluations.map((evl) => {
        // TODO
        return evl.scoreGeneraleEvaluation
      }).reduce((total, num) => total + num, 0);
    });
    this.grandesEntreprises.forEach((etp) => {
      sumScoreGrandes += etp.evaluations.map((evl) => {
        // TODO
        this.evaluationService.get(evl.idEvaluation).subscribe((ev) => {
          evalsEntreprise.push(ev);
          console.log(evalsEntreprise);
          dates.push(ev.date);
          console.log(dates);
          const parsedDates = dates.map(date => new Date(date));
          const sortedDates = parsedDates.sort((a: any, b: any) => a - b);
          const mostRecentDate = sortedDates[sortedDates.length - 1];
          console.log(mostRecentDate);
        });

        return evl.scoreGeneraleEvaluation
      }).reduce((total, num) => total + num, 0);
    });

    if (this.petitesEntreprises.length > 0) {
      this.scoreMoyenPetitesEntreprises = sumScorePetites / this.petitesEntreprises.length;
    } else if (this.petitesEntreprises.length == 0) {
      this.scoreMoyenPetitesEntreprises = 0;
    }
    if (this.moyennesEntreprises.length > 0) {
      this.scoreMoyenMoyennesEntreprises = sumScoreMoyennes / this.moyennesEntreprises.length;
    } else if (this.moyennesEntreprises.length == 0) {
      this.scoreMoyenMoyennesEntreprises = 0;
    }
    if (this.grandesEntreprises.length > 0) {
      this.scoreMoyenGrandesEntreprises = sumScoreGrandes / this.grandesEntreprises.length;
    } else if (this.grandesEntreprises.length == 0) {
      this.scoreMoyenGrandesEntreprises = 0;
    }
    console.log(this.scoreMoyenPetitesEntreprises);
    console.log(this.scoreMoyenMoyennesEntreprises);
    console.log(this.scoreMoyenGrandesEntreprises);
    this.setValueGraph1();
  }

  setValueGraph1() {
    this.value = [[this.scoreMoyenPetitesEntreprises,
      this.scoreMoyenMoyennesEntreprises,
      this.scoreMoyenGrandesEntreprises],
      [this.scoreMoyenPetitesEntreprises,
        this.scoreMoyenMoyennesEntreprises,
        this.scoreMoyenGrandesEntreprises]
    ];
  }

  updateFilteredMetiersByEntreprises() {
    this.filteredMetiers = [];
    this.filteredEntreprises.forEach((etp) => {
      this.filteredMetiers.push(...etp.metiers);
    });
  }

  updateFilteredEvaluationsByEntreprises() {
    this.filteredEvaluations = [];
    this.filteredEntreprises.forEach((etp) => {
      this.filteredEvaluations.push(...etp.evaluations);
    });
  }

  includeMetier(metiers : string[], metier : string){
    var res = false;
    metiers.forEach((met) => {
      if (met == metier) {
        res = true;
      }
    });
    return res;
  }

  updateFilteredEntreprisesByMetiers() {
    this.filteredEntreprises = [];
    this.allEntreprises.forEach((etp) => {
      etp.metiers.forEach((mtr) => {
        if (this.includeMetier(this.metierControl.value, mtr.nomMetier) && !this.filteredEntreprises.includes(etp)) {
          this.filteredEntreprises.push(etp);
        }
      });
    });
  }

  updateFilteredEvaluationsByMetiers() {
    // this.filteredEvaluations = [];
    // this.allEvaluations.forEach((evl) => {
    //   evl.metiers.forEach((mtr) => {

    //   });
    // });
  }

  expand1() {
    this.expand1Counter++;
    if (this.expand1Counter % 2 === 1) {
      this.isExpanded1 = !this.isExpanded1;
      this.isExpanded2 = false;
      this.isExpanded3 = false;
      this.isExpanded4 = false;
      this.hide1 = false;
      this.hide2 = true;
      this.hide3 = true;
      this.hide4 = true;
    } else {
      this.isExpanded1 = !this.isExpanded1;
      this.isExpanded2 = false;
      this.isExpanded3 = false;
      this.isExpanded4 = false;
      this.resetAllExpands();
    }
  }

  expand2() {
    this.expand2Counter++;
    if (this.expand2Counter % 2 === 1) {
      this.isExpanded1 = false;
      this.isExpanded2 = !this.isExpanded2;
      this.isExpanded3 = false;
      this.isExpanded4 = false;
      this.hide1 = true;
      this.hide2 = false;
      this.hide3 = true;
      this.hide4 = true;
    } else {
      this.isExpanded1 = false;
      this.isExpanded2 = !this.isExpanded2;
      this.isExpanded3 = false;
      this.isExpanded4 = false;
      this.resetAllExpands();
    }
  }

  expand3() {
    this.expand3Counter++;
    if (this.expand3Counter % 2 === 1) {
      this.isExpanded1 = false;
      this.isExpanded2 = false;
      this.isExpanded3 = !this.isExpanded3;
      this.isExpanded4 = false;
      this.hide1 = true;
      this.hide2 = true;
      this.hide3 = false;
      this.hide4 = true;
    } else {
      this.isExpanded1 = false;
      this.isExpanded2 = false;
      this.isExpanded3 = !this.isExpanded3;
      this.isExpanded4 = false;
      this.resetAllExpands();
    }
  }

  expand4() {
    this.expand4Counter++;
    if (this.expand4Counter % 2 === 1) {
      this.isExpanded1 = false;
      this.isExpanded2 = false;
      this.isExpanded3 = false;
      this.isExpanded4 = !this.isExpanded4;
      this.hide1 = true;
      this.hide2 = true;
      this.hide3 = true;
      this.hide4 = false;
    } else {
      this.isExpanded1 = false;
      this.isExpanded2 = false;
      this.isExpanded3 = false;
      this.isExpanded4 = !this.isExpanded4;
      this.resetAllExpands();
    }
  }

  resetAllExpands() {
    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.hide4 = false;
  }
}
