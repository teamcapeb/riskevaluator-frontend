import PreconisationGlobale from '@/objects/PreconisationGlobale';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-categorie-questions',
  templateUrl: './gestion-categorie-questions.component.html',
  styleUrls: ['./gestion-categorie-questions.component.scss']
})
export class GestionCategorieQuestionsComponent implements OnInit {

  private _CategorieQuestions: Observable<PreconisationGlobale[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
