import { Component, Input, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { CategorieQuestionService } from "@services/serviceCategorieQuestion/categorie-question.service";
import CategorieQuestion from "@/objects/CategorieQuestion";
import { catchError, map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-evaluation-body',
  templateUrl: './evaluation-body.component.html',
  styleUrls: ['./evaluation-body.component.scss']
})
export class EvaluationBodyComponent implements OnInit {
  @Input() categorieQuestion$: ICategorieQuestion;

  ngOnInit(): void {
    console.log(this.categorieQuestion$.questions);
  }

}
