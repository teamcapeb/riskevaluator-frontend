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
import { Router } from '@angular/router';
import { EntrepriseScoreProjectionResponse } from '@/objects/EntrepriseScoreProjectionResponse';

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
  filteredMetiers: IMetier[] = [];
  filteredQuestionnaires: IQuestionnaire[] = [];
  filteredCategories: ICategorieQuestion[] = [];
  filteredCategorieLibelles: string[] = [];

  autoFilteredEntreprises: IEntreprise[] = [];
  autoFilteredEvaluations: IEvaluation[] = [];
  autoFilteredMetiers: IMetier[] = [];
  autoFilteredQuestionnaires: IQuestionnaire[] = [];
  autoFilteredCategories: ICategorieQuestion[] = [];
  autoFilteredCategorieLibelles: string[] = [];

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

  nbOfThematiques: number = 2;

  appearance = "onDark";

  graph1LabelsX: string[] = ["Petites", "Moyennes", "Grandes"];
  graph1LabelsY: string[] = ["0%", "100%"];
  graph2Labels: string[] = ["Toutes les thématiques"];
  graph3LabelsY: string[] = ["0%", "100%"];
  graph4LabelsY: string[] = ["0", "20"];

  scoresMoyenGraph1: number[][] = [];
  scoresMoyenGraph2: number[] = [];

  metierNames: string[];
  scoresMetiers: number[][] = [];

  libelles: string[];
  nbEvalsParLibelle: number[][] = [];

  nbReponsesParQuestionnaire: number[] = [];

  scoresMoyensEntreprises: EntrepriseScoreProjectionResponse[];

  readonly hintGraph1 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
    this.scoresMoyenGraph1
      .reduce(
        (result, set) => `${result}${tuiFormatNumber(set[$implicit])}%\n`,
        ''
      ).trim();

  readonly hintGraph3 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
    this.scoresMetiers
      .reduce(
        (result, set) => `${result}${tuiFormatNumber(set[$implicit])}%\n`,
        ''
      ).trim();

  readonly hintGraph4 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
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
    private cdr: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit(): void {
    this.evaluationService.getAll().subscribe((res) => {
      this.allEvaluations = res;
      this.filteredEvaluations = res;
      this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
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
      this.nbOfThematiques = res.length;
      this.cdr.detectChanges();
      this.getScoreEffectifEntreprises(this.filteredEntreprises);
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
    this.getNbEvalsParCategorie(this.filteredQuestionnaires);
  }

  getScoreMetiers(metiers: IMetier[]) {
    this.metierService.getScoreParMetier()
      .subscribe((response: MetierScoreProjectionResponse[]) => {
        this.scoresMetiers = [];
        this.metierNames = []
        if (metiers.length == 0) {
          this.metierNames = response.map(item => item.nomMetier);
          this.scoresMetiers.push(
            response.map(item => parseFloat(item.scoreMoyen.toFixed(2)))
          );
        } else {
          var scoreTMP: number[] = []
          metiers.forEach((met) => {
            response.forEach((rep) => {
              if (rep.nomMetier == met.nomMetier) {
                this.metierNames.push(rep.nomMetier);
                scoreTMP.push(parseFloat(rep.scoreMoyen.toFixed(2)))
              }
            })
          })
          this.scoresMetiers.push(scoreTMP)
        }
        this.cdr.detectChanges();
      });
  }

  getNbEvalsParCategorie(questionnaire: IQuestionnaire[]) {
    this.evaluationService.getNbEvalsParCategorie()
      .subscribe((response: EvalCategorieProjectionResponse[]) => {
        this.libelles = []
        this.nbEvalsParLibelle = []
        if (questionnaire.length == 0) {
          this.libelles = response.map(item => item.libelle);
          this.nbEvalsParLibelle.push(
            response.map(item => item.count)
          )
        } else {
          var nbEvals: number[] = [];
          questionnaire.forEach((quest) => {
            response.forEach(rep => {
              if (quest.thematique == rep.thematique) {
                this.libelles.push(rep.libelle)
                nbEvals.push(rep.count)
              }
            });
          })
          this.nbEvalsParLibelle.push(nbEvals)
        }
        this.cdr.detectChanges();
      });
  }

  getScoreEffectifEntreprises(entreprises: IEntreprise[]) {
    var nbPetites: number = 0;
    var nbMoyennes: number = 0;
    var nbGrandes: number = 0;
    var sumPetites: number = 0;
    var sumMoyennes: number = 0;
    var sumGrandes: number = 0;
    var avgPetites: number = 0;
    var avgMoyennes: number = 0;
    var avgGrandes: number = 0;
    var sumThematique : number[] = []
    var tmpScoresMoyensGraph1 : number[][] = []
    this.entrepriseService.getScoreEntreprises().subscribe((response: EntrepriseScoreProjectionResponse[]) => {
      this.scoresMoyensEntreprises = response;
      this.filteredQuestionnaires.forEach((quest) => {
        sumThematique = [];
        response.forEach(rep => {
          if (quest.thematique == rep.thematique) {
            if (rep.taille == "Grande") {
              sumGrandes += rep.scoreMoyen;
              nbGrandes++;
            } else {
              if (rep.taille == "Petite") {
                sumPetites += rep.scoreMoyen;
                nbPetites++;
              } else {
                sumMoyennes += rep.scoreMoyen;
                nbMoyennes++;
              }
            }
          }
        })
        if (nbGrandes != 0) {
          avgGrandes = sumGrandes/nbGrandes;
        }
        if (nbPetites != 0) {
          avgPetites = sumPetites/nbPetites;
        }
        if (nbMoyennes != 0) {
          avgMoyennes = sumMoyennes/nbMoyennes;
        }
        sumThematique.push(parseFloat(avgPetites.toFixed(2)), parseFloat(avgMoyennes.toFixed(2)), parseFloat(avgGrandes.toFixed(2)));
        tmpScoresMoyensGraph1.push(sumThematique);
      })
      this.scoresMoyenGraph1 = tmpScoresMoyensGraph1;
      this.cdr.detectChanges();
    });
  }

  includesEval(evaluations: IEvaluation[], evaluation: IEvaluation) {
    var res = false;
    evaluations.forEach((evl) => {
      if (evl.idEvaluation == evaluation.idEvaluation) {
        res = true;
      }
    })
    return res;
  }

  getNbReponsesParQuestionnaire(questionnaires: IQuestionnaire[]) {
    this.nbReponsesParQuestionnaire = [];
    if (questionnaires.length === 0) {
      questionnaires = this.allQuestionnaires;
    }
    questionnaires.forEach((questionnaire) => {
      var evaluations: IEvaluation[] = [];
      this.allEvaluations.forEach((evaluation) => {
        evaluation.scoreCategories.forEach(score => {
          if (questionnaire.thematique == score.categorieQuestion.questionnaire.thematique && !this.includesEval(evaluations, evaluation)) {
            evaluations.push(evaluation)
          }
        })
      })
      this.nbReponsesParQuestionnaire.push(evaluations.length)
    })
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
      this.getNbEvalsParCategorie(this.filteredQuestionnaires);
      this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
      this.getScoreEffectifEntreprises(this.filteredEntreprises);
    } else {
      this.filteredEntreprises.forEach((element, index) => {
        if (element.noSiret == entreprise.noSiret) {
          this.filteredEntreprises.splice(index, 1);
          this.updateFilteredMetiersByEntreprises();
          this.updateFilteredEvaluationsByEntreprises();
          this.getNbEvalsParCategorie(this.filteredQuestionnaires);
          this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
          this.getScoreEffectifEntreprises(this.filteredEntreprises);
        }
      });
      if (this.entrepriseControl.value.length == 0) {
        this.resetAllFilters();
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
      this.getScoreMetiers(this.filteredMetiers);
      this.getNbEvalsParCategorie(this.filteredQuestionnaires);
      this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
      this.getScoreEffectifEntreprises(this.filteredEntreprises);
    }
    else {
      this.filteredMetiers.forEach((element, index) => {
        if (element.nomMetier == metier.nomMetier) {
          this.filteredMetiers.splice(index, 1);
          this.updateFilteredEntreprisesByMetiers();
          this.updateFilteredEvaluationsByMetiers();
          this.getScoreMetiers(this.filteredMetiers);
          this.getNbEvalsParCategorie(this.filteredQuestionnaires);
          this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
          this.getScoreEffectifEntreprises(this.filteredEntreprises);
        }
      });
      if (this.metierControl.value.length == 0) {
        this.resetAllFilters();
      }
    }
    this.separateEntreprisesEffectif(this.filteredEntreprises);
  }

  selectQuestionnaire(questionnaire: IQuestionnaire, selected: boolean) {
    if (selected) {
      this.filteredQuestionnaires = [];
      this.graph2Labels = [];
      this.allQuestionnaires.forEach(qst => {
        this.questionnaireControl.value.forEach((nom: string) => {
          if (qst.thematique === nom && !this.filteredQuestionnaires.includes(qst)) {
            this.filteredQuestionnaires.push(qst);
            this.graph2Labels.push(qst.thematique);
          }
        });
      });
      this.updateFilteredEntreprisesByQuestionnaires();
      this.updateFilteredMetiersByQuestionnaires();
      this.updateFilteredCategoriesByQuestionnaires();
      this.updateFilteredEvaluationsByQuestionnaires();
      this.getNbEvalsParCategorie(this.filteredQuestionnaires);
      this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
      this.getScoreEffectifEntreprises(this.filteredEntreprises);
    }
    else {
      this.filteredQuestionnaires.forEach((element, index) => {
        if (element.thematique == questionnaire.thematique) {
          this.filteredQuestionnaires.splice(index, 1);
          this.graph2Labels = this.graph2Labels.filter(thm => thm !== element.thematique);
          this.updateFilteredEntreprisesByQuestionnaires();
          this.updateFilteredMetiersByQuestionnaires();
          this.updateFilteredCategoriesByQuestionnaires();
          this.updateFilteredEvaluationsByQuestionnaires();
          this.getNbEvalsParCategorie(this.filteredQuestionnaires);
          this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
          this.getScoreEffectifEntreprises(this.filteredEntreprises);
        }
      });
      if (this.questionnaireControl.value.length == 0) {
        this.graph2Labels = ["Toutes les thématiques"];
        this.resetAllFilters();
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
    // console.log(this.petitesEntreprises);
    // console.log(this.moyennesEntreprises);
    // console.log(this.grandesEntreprises);

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
    // this.scoresMoyenGraph1 = [[this.scoreMoyenPetitesEntreprises,
    //   this.scoreMoyenMoyennesEntreprises,
    //   this.scoreMoyenGrandesEntreprises]
    // ];
  }

  updateFilteredMetiersByEntreprises() {
    // console.log(this.filteredMetiers);
    this.filteredMetiers = [];
    this.filteredEntreprises.forEach((etp) => {
      etp.metiers.forEach((mtr) => {
        if (!this.estNomMetierExistant(this.filteredMetiers, mtr.nomMetier)) {
          this.filteredMetiers.push(mtr);
        }
      });
    });
    this.getScoreMetiers(this.filteredMetiers);
  }

  updateFilteredEvaluationsByEntreprises() {
    this.filteredEvaluations = [];
    this.filteredEntreprises.forEach((etp) => {
      this.filteredEvaluations.push(...etp.evaluations);
    });
  }

  updateFilteredQuestionnairesByEntreprises() {
    this.filteredQuestionnaires = [];
    this.filteredEntreprises.forEach((etp) => {
      this.scoresMoyensEntreprises.forEach((rep) => {

      });
    });
  }

  includesObj(objList: string[], obj: string) {
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
        this.allEntreprises.forEach((etp) => {
          if (etp.noSiret == evl.entreprise.noSiret) {
            this.filteredEntreprises.push(etp);
          }
        })
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

  updateFilteredEvaluationsByQuestionnaires() {
    this.filteredEvaluations = [];
    this.filteredQuestionnaires.forEach((qst) => {
      this.allEvaluations.forEach((evl) => {
        if (evl.scoreCategories.at(0).categorieQuestion.questionnaire.idQuestionnaire == qst.idQuestionnaire) {
          this.filteredEvaluations.push(evl);
        }
      })
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

  navigateToPowerBI() {
    this.router.navigate(["statistiques/power-bi"]);
  }

  resetAllFilters() {
    this.filteredEntreprises = [...this.allEntreprises];
    this.filteredMetiers = [...this.allMetiers];
    this.filteredEvaluations = [...this.allEvaluations];
    this.filteredQuestionnaires = [...this.allQuestionnaires];
    this.filteredCategories = [...this.allCategories];
    this.filteredCategorieLibelles = this.filterLibelles();
  }
}
