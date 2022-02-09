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

  private baseUrl: string = environment.apiUrl + '/preconisationcategorie/';

  constructor(private http: HttpClient) {}

  create(preconisation: PreconisationCategorieQuestion): Promise<IPreconisationCategorieQuestion | string>{
    return this.http.post<IPreconisationCategorieQuestion>(`${this.baseUrl}`, preconisation.toJSON()).toPromise();
  }

  update(preconisationCategorieQuestion: PreconisationCategorieQuestion): Promise<PreconisationCategorieQuestion | string> {
    return this.http.put<PreconisationCategorieQuestion>(`${this.baseUrl}`, preconisationCategorieQuestion.toJSON()).toPromise();
  }

  delete(preconisationCategorieQuestion: PreconisationCategorieQuestion): Promise<PreconisationCategorieQuestion | string> {
    return this.http.delete<PreconisationCategorieQuestion>(`${this.baseUrl}${preconisationCategorieQuestion.idPreconisation}`).toPromise();
  }
}
