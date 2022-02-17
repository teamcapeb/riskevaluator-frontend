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

@Component({
  selector: 'app-evaluation-footer',
  templateUrl: './evaluation-footer.component.html',
  styleUrls: ['./evaluation-footer.component.scss']
})
export class EvaluationFooterComponent implements OnInit {
  @Input() categorieQuestion$: ICategorieQuestion;
  @Input() categoriesQuestions$ : ICategorieQuestion[]

  isLoggedIn = false;

  actualCategorieNumberObs : Observable<IEvalIndex>;

  constructor(private evaluationService: EvaluationService,
              private evaluationApiService:EvaluationApiService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private evalTokenStorageService : EvalTokenStorageService) {

    this.actualCategorieNumberObs = this.evaluationService.actualCategorieNumberObs;
  }


  ngOnInit(): void {
  }

  previousButtonClick() {
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.DECREASE)
  }

  disableNextButton() {
    return false;
  }

   finishButtonClick() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    let user: IUser = this.tokenStorageService.getUser();
    this.evaluationService.onCalculateScore(this.categoriesQuestions$, this.isLoggedIn ? user : null);


    this.evaluationService.evaluation.subscribe(( evaluation : IEvaluation) => {

      this.evalTokenStorageService.saveEvaluation(evaluation);
      this.router.navigate(['evaluer/evaluation-resultat'], { state : {
          evaluation
        } });
    })

    /*
     this.evaluationService.evaluation
       .pipe(
         concatMap((evaluation : IEvaluation) => {

           console.log("[evaluation] =================> ");
           console.log(evaluation);
           return this.evaluationApiService.create(evaluation);     //inner observable
         })
       )
       .subscribe(data => {
         console.log("[INSERTED] =================> ");
         console.log(data)
       })
*/

/*
    if()
    this.evaluationService.evaluation.subscribe(evaluation => {
      this.evaluationApiService.create(evaluation);
      this.router.navigate(['evaluer/evaluation-resultat']);
    })
*/
  }

  nextButtonClick() {
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.INCREASE);
  }
}
