import IPreconisationCategorieQuestion from '@/interfaces/IPreconisationCategorieQuestion';
import PreconisationCategorieQuestion from '@/objects/PreconisationCategorieQuestion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PreconisationCategoriesQuestionService {

  private baseUrl: string = environment.apiUrl + '/PreconisationCategoriesQuestion';

  constructor(private http: HttpClient) {}



  get(preconisationCategorieQuestionId: string): Observable<PreconisationCategorieQuestion> {
    return this.http.get<PreconisationCategorieQuestion>(`${this.baseUrl}/${preconisationCategorieQuestionId}`);
  }

  update(preconisationCategorieQuestion: PreconisationCategorieQuestion): Observable<PreconisationCategorieQuestion | string> {
    return this.http.put<PreconisationCategorieQuestion>(`${this.baseUrl}/${preconisationCategorieQuestion.idPreconisationCategoriesQuestion}`, preconisationCategorieQuestion);
  }

  create(categorieQuestionId: string,preconisationCategorieQuestion: PreconisationCategorieQuestion): Observable<IPreconisationCategorieQuestion | string>{
    return this.http.post<IPreconisationCategorieQuestion>(`${this.baseUrl}/${categorieQuestionId}/PreconisationCategoriesQuestion`, preconisationCategorieQuestion.toJSON());
  }


  delete(preconisationCategorieQuestionId: string): Observable<PreconisationCategorieQuestion | string> {
    return this.http.delete<PreconisationCategorieQuestion>(`${this.baseUrl}/${preconisationCategorieQuestionId}`);
  }
}
