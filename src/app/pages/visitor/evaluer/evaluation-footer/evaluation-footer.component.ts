import { Component, Input, OnInit } from "@angular/core";
import {
  CategorieNumberAction,
  EvaluationService,
  IEvalIndex
} from "@services/serviceEvaluation/evaluation.service";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { Router } from "@angular/router";
import { TokenStorageService } from "@services/serviceUser/token-storage.service";
import { IUser } from "@/interfaces/IUser";
import { EvaluationApiService } from "@services/serviceEvaluation/evaluation-api.service";
import { concatMap, Observable } from "rxjs";
import IEvaluation from "@/interfaces/IEvaluation";
import { IEntreprise } from "@/interfaces/IEntreprise";
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-evaluation-footer',
  templateUrl: './evaluation-footer.component.html',
  styleUrls: ['./evaluation-footer.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]

})
export class EvaluationFooterComponent implements OnInit {
  @Input() categorieQuestion$: ICategorieQuestion;
  @Input() categoriesQuestions$ : ICategorieQuestion[]

  isLoggedIn = false;

  actualCategorieNumberObs : Observable<IEvalIndex>;

  constructor(private evaluationService: EvaluationService,
              private evaluationApiService:EvaluationApiService,
              private router: Router,
              private location: Location,
              private tokenStorageService: TokenStorageService,
              private evalTokenStorageService : EvalTokenStorageService) {


    // Observers subscriptions ;
    this.actualCategorieNumberObs = this.evaluationService.actualCategorieNumberObs;
    this.actualCategorieNumberObs.subscribe(e=> {
      if(e.isLastReturn) {
        this.location.back();
      }
    });

  }


  ngOnInit(): void {
  }

  previousButtonClick() {
    this.scrollToTop();
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.DECREASE)
  }

  disableNextButton() {
    return false;
  }

   finishButtonClick() {
     this.scrollToTop();
     this.isLoggedIn = !!this.tokenStorageService.getToken();
     let user: IUser = this.tokenStorageService.getUser();
     this.evaluationService.onCalculateScore(this.categoriesQuestions$, this.isLoggedIn ? user : null);
     const evaluation = this.evaluationService.evaluation.getValue();
     if(evaluation !== null) {
       this.SaveEvalution(evaluation);
     }

   }

  nextButtonClick() {
    this.scrollToTop();
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.INCREASE);
  }
  scrollToTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }

  SaveEvalution(aEvaluation : IEvaluation) {
    const wEvaluation: IEvaluation = {
      idEvaluation : aEvaluation.idEvaluation,
      scoreGeneraleEvaluation : aEvaluation.scoreGeneraleEvaluation,
      entreprise : aEvaluation.entreprise,
      scoreCategories : aEvaluation.scoreCategories?.map(scoreCategory => {
        scoreCategory.categorieQuestion = { idCategorie : scoreCategory.categorieQuestion.idCategorie}
        return scoreCategory;
      })
    }

    this.evaluationApiService.create(wEvaluation).subscribe( evaluation => {
      if(evaluation) {
        this.evalTokenStorageService.saveEvaluationId(evaluation?.idEvaluation);
        this.router.navigate(['historiques',evaluation?.idEvaluation]);
      }
      }
    )

  }
}
