
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
import { TuiContextWithImplicit, tuiSum } from "@taiga-ui/cdk";
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

  nbMetier : number = 0;

  selectedMetiers : IMetier[]  = [];
  selectedEntreprises : IEntreprise[] = []
  selectedQuestionnaires : IQuestionnaire[] = []

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
  graph2Labels: string[] = [];
  graph3LabelsY: string[] = ["0%", "100%"];
  graph4LabelsY: string[] = ["0", "30"];

  scoresMoyenGraph1: number[][] = [];
  scoresMoyenGraph2: number[] = [];

  metierNames: string[];
  scoresMetiers: number[][] = [];

  libelles: string[];
  nbEvalsParLibelle: number[][] = [];

  nbReponsesParQuestionnaire: number[] = [];
  nbEntreprise = 0 ;
  hintNbReponsesParQuestionnaire: string[][] = [];

  scoresMoyensEntreprises: EntrepriseScoreProjectionResponse[];

  activeItemIndex = NaN;

  isItemActive(index: number): boolean {
      return this.activeItemIndex === index;
  }

  onClick(index: number, hovered: any): void {
    this.activeItemIndex = hovered ? index : 0;
  }

  getColor(index: number): string {
      return `var(--tui-chart-${index})`;
  }

  readonly hintGraph1 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
    this.scoresMoyenGraph1
      .reduce(
        (result, set) => `${result}${tuiFormatNumber(set[$implicit])}%\n`,
        ''
      ).trim();

  readonly hintGraph2 = ({ $implicit }: TuiContextWithImplicit<number>): string =>
  this.hintNbReponsesParQuestionnaire
    .reduce(
      (result, set) => `Nombre d'évaluations: ${result}${set[$implicit]}`, ''
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
      this.autoFilteredEvaluations = res;
      this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
      this.cdr.detectChanges();
    });
    this.entrepriseService.getAll().subscribe((res) => {
      this.allEntreprises = this.sortEntreprises(res);
      this.filteredEntreprises = [...this.allEntreprises];
      this.autoFilteredEntreprises = [...this.allEntreprises];
      this.separateEntreprisesEffectif(this.filteredEntreprises);
      this.nbEntreprise = this.autoFilteredEntreprises.length;
      this.cdr.detectChanges();
    });
    this.metierService.getAllMetiers().subscribe((res) => {
      this.allMetiers = this.sortMetiers(res);
      this.filteredMetiers = [...this.allMetiers];
      this.autoFilteredMetiers = [...this.allMetiers];
      this.nbMetier = this.filteredMetiers.length
      this.cdr.detectChanges();
    });
    this.questionnaireService.getAllQuestionnaires().subscribe((res) => {
      this.allQuestionnaires = this.sortQuestionnaires(res);
      this.filteredQuestionnaires = [...this.allQuestionnaires];
      this.autoFilteredQuestionnaires = [...this.allQuestionnaires];
      this.nbOfThematiques = res.length;
      this.getScoreEffectifEntreprises(this.filteredEntreprises);
      this.getScoreMetiers(this.filteredMetiers);
      this.allQuestionnaires.forEach((qst) => {
        this.graph2Labels.push(qst.thematique);
      });
      this.cdr.detectChanges();
    });
    this.categorieQuestionService.getAll().subscribe((res) => {
      this.allCategories = this.sortCategories(res);
      this.filteredCategories = [...this.allCategories];
      this.autoFilteredCategories = [...this.allCategories];
      this.allCategoriesLibelles = res.map((categorie => {
        return categorie.libelle;
      }));
      this.filteredCategorieLibelles = [...this.allCategoriesLibelles];
      this.getNbEvalsParCategorie(this.filteredQuestionnaires);
      this.cdr.detectChanges();
    });
  }

  getScoreMetiers(metiers: IMetier[]) {
    // TODO CHHECK PQ APPELER 2 FOIS QUAND ON DESELEECTIONNAE ENTREPRISE
    var scoresMetiersTMP: number[][] = [];
    var scoreTMP: number[] = [];
    this.metierService.getScoreParMetier()
      .subscribe((response: MetierScoreProjectionResponse[]) => {
        // TODO PB AUTOFILTERED QUESTIONNAIRES NE CHANGE PAS QUAND ON SELECT QUESTIONNAIRE
        if(this.selectedQuestionnaires.length ==0){
          this.allQuestionnaires.forEach((qst) => {
            scoreTMP = [];
            this.scoresMetiers = [];
            this.metierNames = [];
            if (metiers.length === 0) {
              response.forEach((rep) => {
                if (qst.thematique === rep.thematique) {
                  this.metierNames.push(rep.nomMetier);
                  scoreTMP.push(parseFloat(rep.scoreMoyen.toFixed(2)));
                }
              });
            } else {
              metiers.forEach((mtr) => {
                response.forEach((rep) => {
                  if (mtr.nomMetier === rep.nomMetier && qst.thematique === rep.thematique) {
                    scoreTMP.push(parseFloat(rep.scoreMoyen.toFixed(2)));
                    this.metierNames.push(rep.nomMetier);
                  }
                });
              });
            }
            scoresMetiersTMP.push(scoreTMP);
          });
        }else{
          this.selectedQuestionnaires.forEach((qst) => {
            scoreTMP = [];
            this.scoresMetiers = [];
            this.metierNames = [];
            if (metiers.length === 0) {
              response.forEach((rep) => {
                if (qst.thematique === rep.thematique) {
                  this.metierNames.push(rep.nomMetier);
                  scoreTMP.push(parseFloat(rep.scoreMoyen.toFixed(2)));
                }
              });
            } else {
              metiers.forEach((mtr) => {
                response.forEach((rep) => {
                  if (mtr.nomMetier === rep.nomMetier && qst.thematique === rep.thematique) {
                    scoreTMP.push(parseFloat(rep.scoreMoyen.toFixed(2)));
                    this.metierNames.push(rep.nomMetier);
                  }
                });
              });
            }
            scoresMetiersTMP.push(scoreTMP);
          });
        }
 
        this.scoresMetiers = scoresMetiersTMP;
        this.cdr.detectChanges();
      });
  }

  // getScoreMetiers(metiers: IMetier[]) {
    //   this.metierService.getScoreParMetier()
    //     .subscribe((response: MetierScoreProjectionResponse[]) => {
    //       this.scoresMetiers = [];
    //       this.metierNames = []
    //       if (metiers.length == 0) {
    //         this.metierNames = response.map(item => item.nomMetier);
    //         this.scoresMetiers.push(
    //           response.map(item => parseFloat(item.scoreMoyen.toFixed(2)))
    //         );
    //       } else {
    //         var scoreTMP: number[] = []
    //         metiers.forEach((met) => {
    //           response.forEach((rep) => {
    //             if (rep.nomMetier == met.nomMetier) {
    //               this.metierNames.push(rep.nomMetier);
    //               scoreTMP.push(parseFloat(rep.scoreMoyen.toFixed(2)))
    //             }
    //           })
    //         })
    //         this.scoresMetiers.push(scoreTMP)
    //       }
    //       this.cdr.detectChanges();
    //     });
    // }

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
          // console.log(this.filteredEvaluations)
          var count : number = 0;
          if(this.selectedEntreprises.length == 0){
             questionnaire.forEach((quest) => {
            response.forEach(rep => {
                if (quest.thematique == rep.thematique) {
                  this.libelles.push(rep.libelle)
                  nbEvals.push(rep.count)
                }
              })
          })
          this.nbEvalsParLibelle.push(nbEvals);
          }else{
            questionnaire.forEach((quest) => {
              response.forEach(rep => {
                count=0;
                this.filteredEvaluations.forEach((evl) => {
                  if (evl.scoreCategories[0].categorieQuestion.questionnaire.thematique == rep.thematique) {
                    count++
                  }
                })
                if (quest.thematique == rep.thematique) {
                  this.libelles.push(rep.libelle)
                  nbEvals.push(count)
                }
            })
          })
          this.nbEvalsParLibelle.push(nbEvals);
          }
         
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
      if(this.selectedEntreprises.length == 0){
        if(this.selectedQuestionnaires.length == 0){
          this.allQuestionnaires.forEach((quest) => {
            nbPetites = 0;
            nbMoyennes = 0;
            nbGrandes = 0;
            sumPetites = 0;
            sumMoyennes = 0;
            sumGrandes = 0;
            avgPetites = 0;
            avgMoyennes = 0;
            avgGrandes = 0;
            sumThematique = []
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
            if (nbPetites !=0) {
              avgPetites = sumPetites/nbPetites;
            }
            if (nbMoyennes !=0) {
              avgMoyennes = sumMoyennes/nbMoyennes;
            }
            sumThematique.push(avgPetites, avgMoyennes, avgGrandes);
            tmpScoresMoyensGraph1.push(sumThematique);
          })
        }else{
          this.selectedQuestionnaires.forEach((quest) => {
            nbPetites = 0;
            nbMoyennes = 0;
            nbGrandes = 0;
            sumPetites = 0;
            sumMoyennes = 0;
            sumGrandes = 0;
            avgPetites = 0;
            avgMoyennes = 0;
            avgGrandes = 0;
            sumThematique = []
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
            if (nbPetites !=0) {
              avgPetites = sumPetites/nbPetites;
            }
            if (nbMoyennes !=0) {
              avgMoyennes = sumMoyennes/nbMoyennes;
            }
            sumThematique.push(avgPetites, avgMoyennes, avgGrandes);
            tmpScoresMoyensGraph1.push(sumThematique);
          })
        }
      }else{
        if(this.selectedQuestionnaires.length == 0){
            this.allQuestionnaires.forEach((quest) => {
              nbPetites = 0;
              nbMoyennes = 0;
              nbGrandes = 0;
              sumPetites = 0;
              sumMoyennes = 0;
              sumGrandes = 0;
              avgPetites = 0;
              avgMoyennes = 0;
              avgGrandes = 0;
              sumThematique = []
              this.selectedEntreprises.forEach(etp=>{

              
              response.forEach(rep => {
                if (quest.thematique == rep.thematique && rep.nomEntreprise == etp.nomEntreprise) {
                  if (rep.taille == "Grande" ) {
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
              if (nbPetites !=0) {
                avgPetites = sumPetites/nbPetites;
              }
              if (nbMoyennes !=0) {
                avgMoyennes = sumMoyennes/nbMoyennes;
              }

            })
            sumThematique.push(avgPetites, avgMoyennes, avgGrandes);
            tmpScoresMoyensGraph1.push(sumThematique);
          })
        }else{
          this.selectedQuestionnaires.forEach((quest) => {
            nbPetites = 0;
            nbMoyennes = 0;
            nbGrandes = 0;
            sumPetites = 0;
            sumMoyennes = 0;
            sumGrandes = 0;
            avgPetites = 0;
            avgMoyennes = 0;
            avgGrandes = 0;
            sumThematique = []
            this.selectedEntreprises.forEach(etp=>{
              response.forEach(rep => {
                if (quest.thematique == rep.thematique && rep.nomEntreprise == etp.nomEntreprise) {

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
              if (nbPetites !=0) {
                avgPetites = sumPetites/nbPetites;
              }
              if (nbMoyennes !=0) {
                avgMoyennes = sumMoyennes/nbMoyennes;
              }
            })
            sumThematique.push(avgPetites, avgMoyennes, avgGrandes);
            tmpScoresMoyensGraph1.push(sumThematique);
          })
        }
      }

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
    let tmp: string[] = [];
    this.nbReponsesParQuestionnaire = [];
    this.hintNbReponsesParQuestionnaire = [];
    if (questionnaires.length === 0) {
      questionnaires = this.allQuestionnaires;
    }
    questionnaires.forEach((questionnaire) => {
      var evaluations: IEvaluation[] = [];
      this.filteredEvaluations.forEach((evaluation) => {
        evaluation.scoreCategories.forEach(score => {
          if (questionnaire.thematique == score.categorieQuestion.questionnaire.thematique && !this.includesEval(evaluations, evaluation)) {
            evaluations.push(evaluation)
          }
        })
      })
      this.nbReponsesParQuestionnaire.push(evaluations.length);
      tmp.push(evaluations.length + " (" + Number((evaluations.length/this.filteredEvaluations.length)*100).toFixed(2) + "%)");
    })
    this.hintNbReponsesParQuestionnaire.push(tmp);
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
        this.selectedEntreprises.push(entreprise)
        this.resetAllFilters();
    } else {
        this.selectedEntreprises.forEach((element,index)=>{
        if(element.noSiret == entreprise.noSiret){
          this.selectedEntreprises.splice(index,1)
        }
        this.updateFilteredMetiersByEntreprises();
        this.updateFilteredEvaluationsByEntreprises();
        this.autoFilteredEntreprises = []
        this.resetAllFilters();
      })
    }
  }

  selectMetier(metier: IMetier, selected: boolean) {
    if (selected) {
      this.selectedMetiers.push(metier)
      this.resetAllFilters();
    }
    else {
      this.selectedMetiers.forEach((element,index)=>{
        if(element.nomMetier == metier.nomMetier){
          this.selectedMetiers.splice(index,1)
        }
      })
      this.filteredMetiers.forEach((element, index) => {
        if (element.nomMetier == metier.nomMetier) {
          this.filteredMetiers.splice(index, 1);
          this.updateFilteredEntreprisesByMetiers();
          this.updateFilteredEvaluationsByMetiers();
          this.getScoreMetiers(this.filteredMetiers);
        }
      });
      if (this.metierControl.value.length == 0) {
        this.resetAllFilters();
      }
      if(this.selectedMetiers.length!=0){
        this.nbMetier = this.selectedMetiers.length
      }else{
        this.nbMetier = this.filteredMetiers.length

      }
      if(this.selectedEntreprises.length!=0){
        this.nbEntreprise = this.selectedEntreprises.length
      }else{
        this.nbEntreprise = this.autoFilteredEntreprises.length;

      }
    }

  }


  includesQuestionnaire(questionnaires : IQuestionnaire[],questionnaire : IQuestionnaire){
    var res = false;
    questionnaires.forEach((quest)=>{
      if(questionnaire.idQuestionnaire == quest.idQuestionnaire){
        res = true;
      }
    })
    return res;
  }

  selectQuestionnaire(questionnaire: IQuestionnaire, selected: boolean) {
    // TODO autofiltered ?
    if (selected) {
      this.selectedQuestionnaires = [];
      this.graph2Labels = [];
      this.allQuestionnaires.forEach(qst => {
        this.questionnaireControl.value.forEach((nom: string) => {
          if (qst.thematique === nom && !this.selectedQuestionnaires.includes(qst)) {
            this.selectedQuestionnaires.push(qst);
            this.graph2Labels.push(qst.thematique);
          }
        })
      });
      this.resetAllFilters();
    }
    else {
      this.selectedQuestionnaires.forEach((element,index)=>{
        if(element.idQuestionnaire == questionnaire.idQuestionnaire){
          this.selectedQuestionnaires.splice(index,1);
          this.graph2Labels = this.graph2Labels.filter(thm => thm !== element.thematique);
        }
      })
      this.resetAllFilters();
      if (this.questionnaireControl.value.length == 0) {
        this.getNbEvalsParCategorie(this.allQuestionnaires);
        this.getNbReponsesParQuestionnaire(this.allQuestionnaires);
        this.allQuestionnaires.forEach((qst) => {
          this.graph2Labels.push(qst.thematique);
        });
      }
    }
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

    this.setValueGraph1();
  }

  setValueGraph1() {

  }

  updateFilteredMetiersByEntreprises() {
    if (this.metierControl.value.length == 0 && this.questionnaireControl.value.length == 0) {
        this.filteredMetiers = [];
        this.filteredEntreprises.forEach((etp) => {
          etp.metiers.forEach((mtr) => {
            if (!this.estNomMetierExistant(this.filteredMetiers, mtr.nomMetier)) {
              this.filteredMetiers.push(mtr);
            }
          });
        })
      this.getScoreMetiers(this.filteredMetiers);
    }else{
      var tmpMet : IMetier[] = [];
      this.filteredEntreprises.forEach((etp) => {
        etp.metiers.forEach((mtr) => {
          if (!this.includeMetier(tmpMet,mtr)) {
            tmpMet.push(mtr);
          }
        });
      })
      this.filteredMetiers = tmpMet;
    }
  }

  updateFilteredEvaluationsByEntreprises() {
    if (this.metierControl.value.length == 0 && this.questionnaireControl.value.length == 0) {
      this.filteredEvaluations = [];
      this.filteredEntreprises.forEach((etp) => {
        etp.evaluations.forEach((evlEntreprise)=>{
          this.allEvaluations.forEach((evl)=>{
            if(evl.idEvaluation == evlEntreprise.idEvaluation){
              this.filteredEvaluations.push(evl);
            }
          })
        })
      });
    }else{
      var tmpEvals : IEvaluation[] = [];
      this.filteredEntreprises.forEach((etp) => {
        etp.evaluations.forEach((evlEntreprise)=>{
          this.filteredEvaluations.forEach((evl)=>{
            if(evl.idEvaluation == evlEntreprise.idEvaluation){
              tmpEvals.push(evl);
            }
          })
        })
      });
      this.filteredEvaluations = tmpEvals;
    }
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
    if (this.entrepriseControl.value.length == 0 && this.questionnaireControl.value.length == 0) {
      this.filteredEntreprises = [];
      this.allEntreprises.forEach((etp) => {
        etp.metiers.forEach((mtr) => {
          if (this.includesObj(this.metierControl.value, mtr.nomMetier)
          && !this.estNumeroSiretExistant(this.filteredEntreprises,etp.noSiret)
            ) {
            this.filteredEntreprises.push(etp);
          }
        });
      });
    }else{
      var tmpEtp : IEntreprise[] = [];
      this.filteredEntreprises.forEach((etp) => {
        etp.metiers.forEach((mtr) => {
          if (!this.estNumeroSiretExistant(tmpEtp,etp.noSiret)
            ) {
            tmpEtp.push(etp);
          }
        });
      });
      this.filteredEntreprises = tmpEtp;
    }

  }

  updateFilteredEvaluationsByMetiers() {
    if (this.entrepriseControl.value.length == 0 && this.questionnaireControl.value.length == 0) {
      this.filteredEvaluations = [];
      this.allEvaluations.forEach((evl) => {
        evl.metiers.forEach((mtr) => {
          if (this.includesObj(this.metierControl.value, mtr.nomMetier) && !this.filteredEvaluations.includes(evl)) {
            this.filteredEvaluations.push(evl);
          }
        });
      });
    }else{
      var tmpEvals : IEvaluation[] = [];
      this.filteredEvaluations.forEach((evl) => {
        evl.metiers.forEach((mtr) => {
          if (this.includesObj(this.metierControl.value, mtr.nomMetier)) {
            tmpEvals.push(evl);
          }
        });
      });
      this.filteredEvaluations = tmpEvals;
    }
  }


  updateFilteredEntreprisesByQuestionnaires() {
    if (this.entrepriseControl.value.length == 0 && this.metierControl.value.length == 0) {
      var tmpEtp : IEntreprise[] = []

      this.allEvaluations.forEach((evl) => {
        if (this.includesObj(this.questionnaireControl.value, evl?.scoreCategories[0].categorieQuestion.questionnaire.thematique)) {
          this.allEntreprises.forEach((etp) => {
           if (etp.noSiret == evl.entreprise.noSiret && !this.estNumeroSiretExistant(tmpEtp,evl.entreprise.noSiret)) {
              tmpEtp.push(etp);
            }
          })
        }
      });
      this.filteredEntreprises = tmpEtp.reverse();
    } else {
      var tmpEntreprises : IEntreprise[] = []
      this.allEvaluations.forEach((evl) => {
        if (this.includesObj(this.questionnaireControl.value, evl?.scoreCategories[0].categorieQuestion.questionnaire.thematique)
          ) {
          this.filteredEntreprises.forEach((etp) => {
            if (etp.noSiret == evl.entreprise.noSiret && !this.estNumeroSiretExistant(tmpEntreprises,etp.noSiret)) {
              tmpEntreprises.push(etp);
            }
          })
        }
      });
      this.filteredEntreprises = tmpEntreprises;
    }
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
    if(this.entrepriseControl.value.length == 0 && this.metierControl.value.length == 0){
      this.filteredEvaluations = [];
      this.filteredQuestionnaires.forEach((qst) => {
        this.allEvaluations.forEach((evl) => {
          if (evl.scoreCategories.at(0).categorieQuestion.questionnaire.idQuestionnaire == qst.idQuestionnaire) {
            this.filteredEvaluations.push(evl);
          }
        })
      });
    }else{
      var evals : IEvaluation[] = [];
      this.filteredQuestionnaires.forEach((qst) => {
        this.filteredEvaluations.forEach((evl) => {
          if (evl.scoreCategories.at(0).categorieQuestion.questionnaire.idQuestionnaire == qst.idQuestionnaire) {
            evals.push(evl);
          }
        })
      });
      this.filteredEvaluations = evals;
    }
  }

  includeMetier(metiers:IMetier[],metier : IMetier){
    var res = false;
    metiers.forEach((met)=>{
      if(met.idMetier == metier.idMetier){
        res = true;
      }
    })
    return res
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
    if (this.entrepriseControl.value.length !== 0 &&
        this.metierControl.value.length !== 0 &&
        this.questionnaireControl.value.length !== 0){
      this.filteredEntreprises = [];
      this.allEntreprises.forEach(etp => {
        this.entrepriseControl.value.forEach((nom: string) => {
          if (etp.nomEntreprise === nom && !this.estNumeroSiretExistant(this.filteredEntreprises,etp.noSiret)) {
            this.filteredEntreprises.push(etp);
          }
        });
      });
    this.updateFilteredMetiersByEntreprises();
    this.updateFilteredEvaluationsByEntreprises();
    var tmpMetiers : IMetier[] = [];
    this.filteredMetiers.forEach(mtr => {
      this.metierControl.value.forEach((nom: string) => {
        if (mtr.nomMetier === nom) {
          tmpMetiers.push(mtr);
        }
      });
    });
    this.filteredMetiers = tmpMetiers;
    this.updateFilteredEntreprisesByMetiers();
    this.updateFilteredEvaluationsByMetiers();
    this.getScoreMetiers(this.filteredMetiers);


    var tmpQuestionnaires : IQuestionnaire[] = [];
    this.filteredQuestionnaires.forEach(qst => {
      this.questionnaireControl.value.forEach((nom: string) => {
        if (qst.thematique === nom) {
          tmpQuestionnaires.push(qst);
        }
      });
    });

    this.filteredQuestionnaires = tmpQuestionnaires;
    this.updateFilteredEntreprisesByQuestionnaires();
    this.updateFilteredMetiersByQuestionnaires();
    this.updateFilteredCategoriesByQuestionnaires();
    this.updateFilteredEvaluationsByQuestionnaires();
    this.getNbEvalsParCategorie(this.autoFilteredQuestionnaires);
    this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
    } else{
      if (this.entrepriseControl.value.length !== 0 && this.metierControl.value.length !== 0) {
        this.filteredEntreprises = [];
        this.allEntreprises.forEach(etp => {
          this.entrepriseControl.value.forEach((nom: string) => {
            if (etp.nomEntreprise === nom && !this.estNumeroSiretExistant(this.filteredEntreprises,etp.noSiret)) {
              this.filteredEntreprises.push(etp);
            }
          });
        });
      this.updateFilteredMetiersByEntreprises();
      this.updateFilteredEvaluationsByEntreprises();
      var tmpMetiers : IMetier[] = [];
      this.filteredMetiers.forEach(mtr => {
        this.metierControl.value.forEach((nom: string) => {
          if (mtr.nomMetier === nom) {
            tmpMetiers.push(mtr);
          }
        });
      });
      this.filteredMetiers = tmpMetiers;
      this.updateFilteredEntreprisesByMetiers();
      this.updateFilteredEvaluationsByMetiers();
      this.getScoreMetiers(this.filteredMetiers);
      }
      else{
        if((this.metierControl.value.length != 0 && this.questionnaireControl.value.length != 0)){
          this.filteredMetiers = [];
          this.allMetiers.forEach(mtr => {
          this.metierControl.value.forEach((nom: string) => {
          if (mtr.nomMetier === nom && !this.includeMetier(this.filteredMetiers,mtr)) {
              this.filteredMetiers.push(mtr);
            }
          });


          this.updateFilteredEntreprisesByMetiers();
          this.updateFilteredEvaluationsByMetiers();

          this.getScoreMetiers(this.filteredMetiers);


          var tmpQuestionnaires : IQuestionnaire[] = [];
          this.filteredQuestionnaires.forEach(qst => {
            this.questionnaireControl.value.forEach((nom: string) => {
              if (qst.thematique === nom) {
                tmpQuestionnaires.push(qst);
              }
            });
          });

          this.filteredQuestionnaires = tmpQuestionnaires;
          this.updateFilteredEntreprisesByQuestionnaires();
          this.updateFilteredMetiersByQuestionnaires();
          this.updateFilteredCategoriesByQuestionnaires();
          this.updateFilteredEvaluationsByQuestionnaires();
          // this.getNbEvalsParCategorie(this.filteredQuestionnaires);
          this.getNbEvalsParCategorie(this.autoFilteredQuestionnaires);
          this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);

        })
      }
        else{
          if(this.entrepriseControl.value.length != 0 && this.questionnaireControl.value.length != 0){
          this.filteredEntreprises = [];
          this.allEntreprises.forEach(etp => {
            this.entrepriseControl.value.forEach((nom: string) => {
              if (etp.nomEntreprise === nom && ! this.estNumeroSiretExistant(this.filteredEntreprises,etp.noSiret)) {
                this.filteredEntreprises.push(etp);
              }
            });
          });
        this.updateFilteredMetiersByEntreprises();
        this.updateFilteredEvaluationsByEntreprises();

        var tmpQuestionnaires : IQuestionnaire[] = [];
        this.filteredQuestionnaires.forEach(qst => {
          this.questionnaireControl.value.forEach((nom: string) => {
            if (qst.thematique === nom) {
              tmpQuestionnaires.push(qst);
            }
          });
        });

        this.filteredQuestionnaires = tmpQuestionnaires;
        this.updateFilteredEntreprisesByQuestionnaires();
        this.updateFilteredMetiersByQuestionnaires();
        this.updateFilteredCategoriesByQuestionnaires();
        this.updateFilteredEvaluationsByQuestionnaires();
        // this.getNbEvalsParCategorie(this.filteredQuestionnaires);
        this.getNbEvalsParCategorie(this.autoFilteredQuestionnaires);
        this.getNbReponsesParQuestionnaire(this.filteredQuestionnaires);
        }
        else{
          if(this.entrepriseControl.value.length != 0){
            this.filteredEntreprises = [];
            this.allEntreprises.forEach(etp => {
              this.entrepriseControl.value.forEach((nom: string) => {
                if (etp.nomEntreprise === nom && !this.estNumeroSiretExistant(this.filteredEntreprises,etp.noSiret)) {
                  this.filteredEntreprises.push(etp);
                }
              });
            });
          this.updateFilteredMetiersByEntreprises();
          this.updateFilteredEvaluationsByEntreprises();
        }
        else{
          if(this.metierControl.value.length != 0 ){
            this.filteredMetiers = [];
            this.allMetiers.forEach(mtr => {
            this.metierControl.value.forEach((nom: string) => {
            if (mtr.nomMetier === nom && !this.includeMetier(this.filteredMetiers,mtr)) {
                this.filteredMetiers.push(mtr);
              }
            });
          });
          this.updateFilteredEntreprisesByMetiers();
          this.updateFilteredEvaluationsByMetiers();
          this.getScoreMetiers(this.filteredMetiers);
          }else{

            if(this.questionnaireControl.value.length != 0){
              this.filteredQuestionnaires = [];
              this.allQuestionnaires.forEach(qst => {
                this.questionnaireControl.value.forEach((nom: string) => {
                  if (qst.thematique === nom && !this.includesQuestionnaire(this.filteredQuestionnaires,qst)) {
                    this.filteredQuestionnaires.push(qst);
                  }
                });
              });
              this.updateFilteredEntreprisesByQuestionnaires();
              this.updateFilteredMetiersByQuestionnaires();
              this.updateFilteredCategoriesByQuestionnaires();
              this.updateFilteredEvaluationsByQuestionnaires();
              if(this.selectedQuestionnaires.length != 0){
                this.getNbEvalsParCategorie(this.selectedQuestionnaires);
                this.getNbReponsesParQuestionnaire(this.selectedQuestionnaires);
                // TODO CHECK
                this.getScoreEffectifEntreprises(this.autoFilteredEntreprises); // ?
                this.getScoreMetiers(this.filteredMetiers);
              }
            }
            else{
              this.getNbEvalsParCategorie(this.allQuestionnaires);
              this.getNbReponsesParQuestionnaire(this.allQuestionnaires);
              // TODO CHECK
              this.getScoreEffectifEntreprises(this.autoFilteredEntreprises); // ?
              this.getScoreMetiers(this.autoFilteredMetiers);
            }
          }
        }
      }
    }
  }
    }
    if(this.questionnaireControl.value.length !=0 || this.entrepriseControl.value.length != 0){
      this.filteredMetiers = [...this.autoFilteredMetiers]
      this.autoFilteredMetiers = [];
    }
    this.autoFilteredQuestionnaires = [];

    if(this.metierControl.value.length != 0 || this.questionnaireControl.value.length !=0){
      this.filteredEntreprises = [...this.autoFilteredEntreprises];
      this.autoFilteredEntreprises = [];
    }
    if(this.metierControl.value.length == 0 && this.questionnaireControl.value.length ==0){
      this.autoFilteredEntreprises = this.allEntreprises;
    }

    if(this.questionnaireControl.value.length ==0 && this.entrepriseControl.value.length == 0){
      this.autoFilteredMetiers = this.allMetiers;
    }
    this.separateEntreprisesEffectif(this.filteredEntreprises);
    if(this.selectedMetiers.length!=0){
      this.nbMetier = this.selectedMetiers.length
    }else{
      this.nbMetier = this.autoFilteredMetiers.length

    }
    if(this.selectedEntreprises.length!=0){
      this.nbEntreprise = this.selectedEntreprises.length
    }else{
      this.nbEntreprise = this.autoFilteredEntreprises.length;

    }

    this.selectedEntreprises.forEach((etp)=>{
      if(!this.estNumeroSiretExistant(this.autoFilteredEntreprises,etp.noSiret)){
        this.autoFilteredEntreprises.push(etp)
      }
      if(this.selectedQuestionnaires.length!=0){
          this.selectedQuestionnaires.forEach((quest)=>{
            this.allQuestionnaires.forEach((questionnaire)=>{
              etp.metiers.forEach((met)=>{
                 if(quest.idQuestionnaire == questionnaire.idQuestionnaire && !this.includeMetier(this.autoFilteredMetiers,met)){
                this.autoFilteredMetiers.push(met)
               }
             })
            })
          })
      }else{
        etp.metiers.forEach((met)=>{
          if(!this.includeMetier(this.autoFilteredMetiers,met)){
           this.autoFilteredMetiers.push(met)
          }
        })

      }
      })



    this.selectedMetiers.forEach(met=>{
      if(!this.includeMetier(this.autoFilteredMetiers,met)){
        this.autoFilteredMetiers.push(met)
      }
    })

    this.allEntreprises.forEach((etp)=>{
      this.selectedMetiers.forEach(met=>{

        if(!this.estNumeroSiretExistant(this.autoFilteredEntreprises,etp.noSiret) && this.includeMetier(etp.metiers,met)){
          this.autoFilteredEntreprises.push(etp)
        }
      })

      this.allEvaluations.forEach((allEvl)=>{
        etp.evaluations.forEach((evl)=>{
          if(allEvl.idEvaluation == evl.idEvaluation){
            if(!this.includesQuestionnaire(this.autoFilteredQuestionnaires,
              allEvl.scoreCategories[0].categorieQuestion.questionnaire)){
                this.autoFilteredQuestionnaires.push(allEvl.scoreCategories[0].categorieQuestion.questionnaire)
            }
            this.selectedQuestionnaires.forEach((quest)=>{
              if(!this.estNumeroSiretExistant(this.autoFilteredEntreprises,etp.noSiret) && allEvl.scoreCategories[0].categorieQuestion.questionnaire.idQuestionnaire == quest.idQuestionnaire){
                etp.metiers.forEach((met)=>{
                  if(!this.estNumeroSiretExistant(this.autoFilteredEntreprises,etp.noSiret) &&
                  (this.selectedMetiers.length==0 || (this.selectedMetiers.length != 0 &&
                     this.includeMetier(this.selectedMetiers,met)))){
                    this.autoFilteredEntreprises.push(etp)
                  }
                  if(!this.includeMetier(this.autoFilteredMetiers,met) && this.selectedEntreprises.length == 0){
                    this.autoFilteredMetiers.push(met)
                  }else{
                    if(this.selectedEntreprises.length!=0 && !this.includeMetier(this.autoFilteredMetiers,met)){
                      this.selectedEntreprises.forEach((etp)=>{
                      if(this.selectedQuestionnaires.length!=0){
                          this.selectedQuestionnaires.forEach((quest)=>{
                            this.allQuestionnaires.forEach((questionnaire)=>{
                              etp.metiers.forEach((met)=>{
                                if(quest.idQuestionnaire == questionnaire.idQuestionnaire && !this.includeMetier(this.autoFilteredMetiers,met)){
                                  this.autoFilteredMetiers.push(met)
                              }
                            })
                            })
                        })
                      }else{
                        etp.metiers.forEach((met)=>{
                          if(!this.includeMetier(this.autoFilteredMetiers,met)){
                          this.autoFilteredMetiers.push(met)
                          }
                        })
                        this.updateNumbers()
                      }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      })
      this.getNbReponsesParQuestionnaire(this.allQuestionnaires)
      this.getScoreEffectifEntreprises(this.allEntreprises)
      if(this.selectedQuestionnaires.length != 0){
        this.getNbEvalsParCategorie(this.selectedQuestionnaires);
      }else{
        this.getNbEvalsParCategorie(this.allQuestionnaires);
      }
     
      this.filteredEntreprises = [...this.autoFilteredEntreprises];
      this.filteredMetiers = [...this.autoFilteredMetiers]
      var questionnaires : IQuestionnaire[]  = []
      // console.log(questionnaires)
      
      this.updateNumbers();
    })
  }

  updateNumbers(){
    if (this.selectedMetiers.length !== 0){
      this.nbMetier = this.selectedMetiers.length
    } else{
      this.nbMetier = this.autoFilteredMetiers.length
    }
    if (this.selectedEntreprises.length !== 0){
      this.nbEntreprise = this.selectedEntreprises.length
    } else {
      this.nbEntreprise = this.autoFilteredEntreprises.length;
    }
  }

  getColShown(): number {
    if (!this.hide1 && !this.hide2 && !this.hide3 && !this.hide4) {
      return 2;
    }
    else {
      return 1;
    }
  }
}


