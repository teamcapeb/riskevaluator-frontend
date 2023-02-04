import { QuestionService } from '@services/serviceQuestion/question.service';
import { Component, Input, OnChanges, OnInit } from "@angular/core";
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
export class EvaluationBodyComponent implements OnInit,OnChanges {
  @Input() categorieQuestion$: ICategorieQuestion;
  ngOnInit(): void {
    this.questionService.numberOfQuestions = this.categorieQuestion$.questions.length;
  }

  ngOnChanges(){
    this.questionService.numberOfQuestions = this.categorieQuestion$.questions.length;
  }

  constructor(private questionService : QuestionService){

  }

}
