import PreconisationCategorieQuestion from '@/interfaces/PreconisationCategorieQuestion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import CategorieQuestion from '../../interfaces/CategorieQuestion';

@Injectable({
  providedIn: 'root'
})
export class CategorieQuestionService {

  private baseUrl: string = environment.apiUrl + '/categoriesQuestion';

  constructor(private http: HttpClient) {}

  getAllPreconisationCategoriesQuestion(categorieQuestionId: string): Observable<PreconisationCategorieQuestion[]> {
    return this.http.get<PreconisationCategorieQuestion[]>(`${this.baseUrl}/${categorieQuestionId}/PreconisationCategoriesQuestion`);
  }

  createPreconisationCategoriesQuestion(questionnaireId: string, preconisation: PreconisationCategorieQuestion): Observable<PreconisationCategorieQuestion | string>{
    return this.http.post<PreconisationCategorieQuestion>(`${this.baseUrl}/${questionnaireId}/PreconisationCategoriesQuestion`, preconisation);
  }

  get(categorieQuestionId: string): Observable<CategorieQuestion> {
    return this.http.get<CategorieQuestion>(`${this.baseUrl}/${categorieQuestionId}`);
  }

  update(categorieQuestionId: string, categorieQuestion: CategorieQuestion): Observable<CategorieQuestion | string> {
    return this.http.put<CategorieQuestion>(`${this.baseUrl}/${categorieQuestionId}`, categorieQuestion);
  }

  delete(categorieQuestionId: string): Observable<CategorieQuestion | string> {
    return this.http.delete<CategorieQuestion>(`${this.baseUrl}/${categorieQuestionId}`);
  }
}
