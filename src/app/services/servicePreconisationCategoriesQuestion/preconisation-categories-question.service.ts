import PreconisationCategorieQuestion from '@/interfaces/PreconisationCategorieQuestion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreconisationCategoriesQuestionService {

  private baseUrl: string = environment.apiUrl + '/PreconisationCategoriesQuestion';

  constructor(private http: HttpClient) {}

  get(preconisationCategorieQuestionId: string): Observable<PreconisationCategorieQuestion> {
    return this.http.get<PreconisationCategorieQuestion>(`${this.baseUrl}/${preconisationCategorieQuestionId}`);
  }

  update(preconisationCategorieQuestionId: string, preconisationCategorieQuestion: PreconisationCategorieQuestion): Observable<PreconisationCategorieQuestion | string> {
    return this.http.put<PreconisationCategorieQuestion>(`${this.baseUrl}/${preconisationCategorieQuestionId}`, preconisationCategorieQuestion);
  }

  delete(preconisationCategorieQuestionId: string): Observable<PreconisationCategorieQuestion | string> {
    return this.http.delete<PreconisationCategorieQuestion>(`${this.baseUrl}/${preconisationCategorieQuestionId}`);
  }
}
