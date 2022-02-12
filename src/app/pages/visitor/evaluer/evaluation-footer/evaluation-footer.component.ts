import { Component, Input, OnInit } from "@angular/core";
import { CategorieNumberAction, EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { Router } from "@angular/router";
import { TokenStorageService } from "@services/serviceUser/token-storage.service";
import { IUser } from "@/interfaces/IUser";

@Component({
  selector: 'app-evaluation-footer',
  templateUrl: './evaluation-footer.component.html',
  styleUrls: ['./evaluation-footer.component.scss']
})
export class EvaluationFooterComponent implements OnInit {
  @Input() categorieQuestion$: ICategorieQuestion;
  @Input() categoriesQuestions$ : ICategorieQuestion[]

  isLoggedIn = false;

  constructor(private evaluationService: EvaluationService, private router: Router, private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {
  }

  previousButtonClick() {
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.DECREASE)
  }

  disableNextButton() {
    return false;
  }

  finishButtonClick(){


    this.isLoggedIn = !!this.tokenStorageService.getToken();

    let user : IUser = this.tokenStorageService.getUser();

    this.evaluationService.onCalculateScore(this.categoriesQuestions$, this.isLoggedIn?user:null);



    this.router.navigate(['evaluer/evaluation-resultat']);
  }

  nextButtonClick() {
    this.evaluationService.onNextCategorieNumber(CategorieNumberAction.INCREASE);
  }
}
