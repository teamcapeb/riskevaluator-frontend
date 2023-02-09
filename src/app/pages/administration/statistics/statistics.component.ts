import { EvalCategorieProjectionResponse } from './../../../objects/EvalCategorieProjectionResponse';
import { EvaluationApiService } from "@services/serviceEvaluation/evaluation-api.service";
import { CategorieQuestionService } from "@services/serviceCategorieQuestion/categorie-question.service";
import { QuestionnaireService } from "@services/serviceQuestionnaire/questionnaire.service";
import { IEntreprise } from "@/interfaces/IEntreprise";
import { IMetier } from "@/interfaces/IMetier";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MetierService } from "@services/serviceMetier/metier.service";
import { EntrepriseService } from "@services/serviceEntreprise/entreprise.service";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IEvaluation from "@/interfaces/IEvaluation";
import { TuiContextWithImplicit } from "@taiga-ui/cdk";
import { MetierScoreProjectionResponse } from "@/objects/MetierScoreProjectionResponse";
import { tuiFormatNumber } from "@taiga-ui/core";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  entrepriseControl = new FormControl("");
  metierControl = new FormControl("");
  questionnaireControl = new FormControl("");

  allEvaluations: IEvaluation[];
  allEntreprises: IEntreprise[];
  allMetiers: IMetier[];
  allQuestionnaires: IQuestionnaire[];
  allCategories: ICategorieQuestion[];
  allCategoriesLibelles: string[];

  filteredEntreprises: IEntreprise[] = [];
  filteredEvaluations: IEvaluation[] = [];
  filteredMetiers : IMetier[] = [];
  filteredQuestionnaires : IQuestionnaire[] = [];
  filteredCategories : ICategorieQuestion[] = [];
  filteredCategorieLibelles : string[] = [];

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null)
  });

  petitesEntreprises: IEntreprise[] = [];
  moyennesEntreprises: IEntreprise[] = [];
  grandesEntreprises: IEntreprise[] = [];

  scoreMoyenPetitesEntreprises: number = 0;
  scoreMoyenMoyennesEntreprises: number = 0;
  scoreMoyenGrandesEntreprises: number = 0;

  graph1LabelsX: string[] = ["Petites", "Moyennes", "Grandes"];
  graph1LabelsY: string[] = ["0%", "100%"];
  graph2LabelsX: string[] = [];
  graph2LabelsY: string[] = ["0", "100"];
  graph3LabelsX: string[] = [];
  graph3LabelsY: string[] = [];
  graph4LabelsX: string[] = [];
  graph4LabelsY: string[] = ["0", "20"];

  scoresMoyenGraph1: any;
  scoresMoyenGraph2: number[] = [];

  readonly appearances = ["onDark", "error"];
  appearance = "onDark";

  metierNames: string[];
  scoresMetiers: number[][] = [];

  libelles: string[];
  nbEvalsParLibelle: number[][] = [];

  readonly value = [40, 30, 20, 10];

  readonly hint3 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
  this.scoresMetiers
      .reduce(
        (result, set) => `${result}${tuiFormatNumber(set[$implicit])}%\n`,
        ''
      ).trim();

  readonly hint4 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
  this.nbEvalsParLibelle
      .reduce(
        (result, set) => `${result}${tuiFormatNumber(set[$implicit])}\n`,
        ''
      ).trim();

  constructor(private evaluationService: EvaluationApiService,
              private entrepriseService: EntrepriseService,
              private metierService: MetierService,
              private questionnaireService: QuestionnaireService,
              private categorieQuestionService: CategorieQuestionService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.evaluationService.getAll().subscribe((res) => {
      this.allEvaluations = res;
      this.filteredEvaluations = res;
      this.cdr.detectChanges();
    });
    this.entrepriseService.getAll().subscribe((res) => {
      this.allEntreprises = this.sortEntreprises(res);
      this.filteredEntreprises = [...this.allEntreprises];
      this.separateEntreprisesEffectif(this.filteredEntreprises);
      this.cdr.detectChanges();
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.allMetiers = this.sortMetiers(res);
      this.filteredMetiers = [...this.allMetiers];
      this.cdr.detectChanges();
    });
    this.questionnaireService.getAllQuestionnaires().subscribe((res) => {
      this.allQuestionnaires = this.sortQuestionnaires(res);
      this.filteredQuestionnaires = [...this.allQuestionnaires];
      this.cdr.detectChanges();
    });
    this.categorieQuestionService.getAll().subscribe((res) => {
      this.allCategories = this.sortCategories(res);
      this.filteredCategories = [...this.allCategories];
      this.allCategoriesLibelles = res.map((categorie => {
        return categorie.libelle;
      }));
      this.filteredCategorieLibelles = [...this.allCategoriesLibelles];
      this.cdr.detectChanges();
    });
    this.getScoreMetiers(this.filteredMetiers);
    this.getNbEvalsParCategorie();
  }

  getScoreMetiers(metiers: IMetier[]) {
    this.metierService.getScoreParMetier()
      .subscribe((response: MetierScoreProjectionResponse[]) => {
        // TODO filtrage
        this.metierNames = response.map(item => item.nomMetier);
        this.scoresMetiers.push(
          response.map(item => parseFloat(item.scoreMoyen.toFixed(2)))
        );
        this.cdr.detectChanges();
      });
  }

  getNbEvalsParCategorie() {
    this.evaluationService.getNbEvalsParCategorie()
    .subscribe((response: EvalCategorieProjectionResponse[]) => {
      // TODO filtrage
      this.libelles = response.map(item => item.libelle);
      this.nbEvalsParLibelle.push(
        response.map(item => item.count)
      )
      this.cdr.detectChanges();
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

  sortCategories(categories: ICategorieQuestion[]): ICategorieQuestion[] {
    return categories.sort(
      (a, b) => {
        if (a.libelle.toUpperCase() < b.libelle.toUpperCase()) {
          return -1;
        }
        if (a.libelle.toUpperCase() > b.libelle.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    )
  }

  selectEntreprise(entreprise: IEntreprise, selected: boolean) {
    if (selected) {
      if (this.entrepriseControl.value.length == 1) {
        this.filteredEntreprises = [];
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
      this.filteredEntreprises.forEach((element, index) => {
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
        this.filteredQuestionnaires = [...this.allQuestionnaires];
        this.filteredCategories = [...this.allCategories];
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
      this.updateFilteredEvaluationsByMetiers();
    }
    else {
      this.filteredMetiers.forEach((element, index) => {
        if (element.nomMetier == metier.nomMetier) {
          this.filteredMetiers.splice(index, 1);
          this.updateFilteredEntreprisesByMetiers();
          this.updateFilteredEvaluationsByMetiers();
        }
      });
      if (this.metierControl.value.length == 0) {
        this.filteredMetiers = [...this.allMetiers];
        this.filteredEntreprises = [...this.allEntreprises];
        this.filteredEvaluations = [...this.allEvaluations];
        this.filteredQuestionnaires = [...this.allQuestionnaires];
        this.filteredCategories = [...this.allCategories];
      }
    }
    this.separateEntreprisesEffectif(this.filteredEntreprises);
  }

  selectQuestionnaire(questionnaire: IQuestionnaire, selected: boolean) {
    if (selected) {
      this.filteredQuestionnaires = [];
      this.allQuestionnaires.forEach(qst => {
        this.questionnaireControl.value.forEach((nom: string) => {
          if (qst.thematique === nom && !this.filteredQuestionnaires.includes(qst)) {
            this.filteredQuestionnaires.push(qst);
          }
        });
      });
      this.updateFilteredEntreprisesByQuestionnaires();
      this.updateFilteredMetiersByQuestionnaires();
      this.updateFilteredCategoriesByQuestionnaires();
    }
    else {
      this.filteredQuestionnaires.forEach((element, index) => {
        if (element.thematique == questionnaire.thematique) {
          this.filteredQuestionnaires.splice(index, 1);
          this.updateFilteredEntreprisesByQuestionnaires();
          this.updateFilteredMetiersByQuestionnaires();
          this.updateFilteredCategoriesByQuestionnaires();
        }
      });
      if (this.questionnaireControl.value.length == 0) {
        this.filteredMetiers = [...this.allMetiers];
        this.filteredEntreprises = [...this.allEntreprises];
        this.filteredEvaluations = [...this.allEvaluations];
        this.filteredQuestionnaires = [...this.allQuestionnaires];
        this.filteredCategories = [...this.allCategories];
        this.filteredCategorieLibelles = this.filterLibelles();
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
      } else if (etp.effectif >= 6 && etp.effectif <= 10) {
        this.moyennesEntreprises.push(etp);
      } else if (etp.effectif > 10) {
        this.grandesEntreprises.push(etp);
      }
    });
    this.scoresMoyensTailleEntreprises();
  }

  scoresMoyensTailleEntreprises() {
    // TODO GERER LES DATES

    // let sumScorePetites: number = 0;
    // let sumScoreMoyennes: number = 0;
    // let sumScoreGrandes: number = 0;

    // let nbQuestionnaires = this.filteredQuestionnaires.length;
    // let evalsEntreprise: IEvaluation[] = [];
    // let dates : string[] = [];

    // this.petitesEntreprises.forEach((etp) => {
    //   for (let i=0; i<nbQuestionnaires; i++) {
    //     this.scoresMoyenGraph1;
    //   }
    // });

    // this.moyennesEntreprises.forEach((etp) => {
    //   sumScoreMoyennes += etp.evaluations.map((evl) => {
    //     // TODO
    //     return evl.scoreGeneraleEvaluation;
    //   }).reduce((total, num) => total + num, 0);
    // });


    // this.grandesEntreprises.forEach((etp) => {
    //   sumScoreGrandes += etp.evaluations.map((evl) => {
    //     // TODO
    //     return evl.scoreGeneraleEvaluation;
    //   }).reduce((total, num) => total + num, 0);
    // });

    // if (this.petitesEntreprises.length > 0) {
    //   this.scoreMoyenPetitesEntreprises = sumScorePetites / this.petitesEntreprises.length;
    // } else if (this.petitesEntreprises.length == 0) {
    //   this.scoreMoyenPetitesEntreprises = 0;
    // }
    // if (this.moyennesEntreprises.length > 0) {
    //   this.scoreMoyenMoyennesEntreprises = sumScoreMoyennes / this.moyennesEntreprises.length;
    // } else if (this.moyennesEntreprises.length == 0) {
    //   this.scoreMoyenMoyennesEntreprises = 0;
    // }
    // if (this.grandesEntreprises.length > 0) {
    //   this.scoreMoyenGrandesEntreprises = sumScoreGrandes / this.grandesEntreprises.length;
    // } else if (this.grandesEntreprises.length == 0) {
    //   this.scoreMoyenGrandesEntreprises = 0;
    // }
    this.setValueGraph1();
  }

  setValueGraph1() {
    this.scoresMoyenGraph1 = [[this.scoreMoyenPetitesEntreprises,
      this.scoreMoyenMoyennesEntreprises,
      this.scoreMoyenGrandesEntreprises]
    ];
  }

  updateFilteredMetiersByEntreprises() {
    this.filteredMetiers = [];
    this.filteredEntreprises.forEach((etp) => {
      etp.metiers.forEach((mtr) => {
        if (!this.estNomMetierExistant(this.filteredMetiers, mtr.nomMetier)) {
          this.filteredMetiers.push(mtr);
        }
      });
    });
  }

  updateFilteredEvaluationsByEntreprises() {
    this.filteredEvaluations = [];
    this.filteredEntreprises.forEach((etp) => {
      this.filteredEvaluations.push(...etp.evaluations);
    });
  }

  includesObj(objList: string[], obj: string){
    var res = false;
    objList.forEach((o) => {
      if (o == obj) {
        res = true;
      }
    });
    return res;
  }

  updateFilteredEntreprisesByMetiers() {
    this.filteredEntreprises = [];
    this.allEntreprises.forEach((etp) => {
      etp.metiers.forEach((mtr) => {
        if (this.includesObj(this.metierControl.value, mtr.nomMetier) && !this.filteredEntreprises.includes(etp)) {
          this.filteredEntreprises.push(etp);
        }
      });
    });
  }

  updateFilteredEvaluationsByMetiers() {
    this.filteredEvaluations = [];
    this.allEvaluations.forEach((evl) => {
      evl.metiers.forEach((mtr) => {
        if (this.includesObj(this.metierControl.value, mtr.nomMetier) && !this.filteredEvaluations.includes(evl)) {
          this.filteredEvaluations.push(evl);
        }
      });
    });
  }

  updateFilteredEntreprisesByQuestionnaires() {
    this.filteredEntreprises = [];
    this.allEvaluations.forEach((evl) => {
      if (this.includesObj(this.questionnaireControl.value, evl?.scoreCategories[0].categorieQuestion.questionnaire.thematique) &&
          !this.estNumeroSiretExistant(this.filteredEntreprises, evl.entreprise.noSiret)) {
        // TODO
        this.entrepriseService.getById(evl.entreprise.noSiret).subscribe((res) => {
          this.filteredEntreprises.push(res);
        });
      }
    });
  }

  updateFilteredMetiersByQuestionnaires() {
    this.updateFilteredMetiersByEntreprises();
  }

  updateFilteredCategoriesByQuestionnaires() {
    this.filteredCategories = [];
    this.filteredCategorieLibelles = [];
    this.filteredQuestionnaires.forEach((qst) => {
      this.filteredCategories.push(...qst.categorieQuestions);
      this.filteredCategorieLibelles = this.filterLibelles();
    });
  }

  filterLibelles() {
    return this.filteredCategories.map((categorie => {
      return categorie.libelle;
    }));
  }

  nbEvalsLibelles() {
    this.filteredCategories;
  }

  estNumeroSiretExistant(entreprises: IEntreprise[], noSiret: number) {
    var res = false;
    entreprises.forEach((etp) => {
      if (etp.noSiret === noSiret) {
        res = true;
      }
    });
    return res;
  }

  estNomMetierExistant(metiers: IMetier[], nomMetier: string) {
    var res = false;
    metiers.forEach((mtr) => {
      if (mtr.nomMetier === nomMetier) {
        res = true;
      }
    });
    return res;
  }

  // setValueGraph1() {
  //   this.scoresMoyenGraph1 = [[this.scoreMoyenPetitesEntreprises,
  //     this.scoreMoyenMoyennesEntreprises,
  //     this.scoreMoyenGrandesEntreprises]
  //   ];
  // }

  setValueGraph2() {
    this.scoresMoyenGraph2 = [this.scoreMoyenPetitesEntreprises,
      this.scoreMoyenMoyennesEntreprises,
      this.scoreMoyenGrandesEntreprises];
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
