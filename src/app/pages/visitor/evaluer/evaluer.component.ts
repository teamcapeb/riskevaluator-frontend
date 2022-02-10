import CategorieQuestion from '@/objects/CategorieQuestion';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CategorieQuestionService } from "@services/serviceCategorieQuestion/categorie-question.service";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";

@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {

  public categorieQuestion$: Observable<CategorieQuestion[]>;

  constructor(private categorieQuestionService:CategorieQuestionService) { }

  ngOnInit(): void {
    this.categorieQuestionService.getAll().subscribe(ele => {

      let x: any = ele[0];

      let result: CategorieQuestion = Object.assign(new CategorieQuestion(), x)
      console.log(result.getMsg());
    });
  }

}
