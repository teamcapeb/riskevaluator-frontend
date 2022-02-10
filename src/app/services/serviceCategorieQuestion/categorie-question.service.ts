import IPreconisationCategorieQuestion from '@/interfaces/IPreconisationCategorieQuestion';
import CategorieQuestion from '@/objects/CategorieQuestion';
import PreconisationCategorieQuestion from '@/objects/PreconisationCategorieQuestion';
import Question from '@/objects/Question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ICategorieQuestion from '../../interfaces/ICategorieQuestion';
import IQuestion from '../../interfaces/IQuestion';


@Injectable({
  providedIn: 'root'
})
export class CategorieQuestionService {

  private baseUrl: string = environment.apiUrl + '/categoriesQuestion/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategorieQuestion[]> {
    return this.http.get<ICategorieQuestion[]>(`${this.baseUrl}`);
  }

  get(categorieQuestionId: number): Observable<CategorieQuestion> {
    return this.http.get<ICategorieQuestion>(`${this.baseUrl}${categorieQuestionId}`).pipe(map((receivedData: ICategorieQuestion) => {
      return CategorieQuestion.toCategorieQuestion(receivedData);
    }));
  }
  createQuestionCategoriesQuestion(categorieQuestionId: number, question: Question): Promise<IQuestion | string>{
    return this.http.post<IQuestion>(`${this.baseUrl}/${categorieQuestionId}/Questions`, question.toJSON()).toPromise();
  }
  create(categorieQuestion: CategorieQuestion): Promise<ICategorieQuestion | string>{
    return this.http.post<ICategorieQuestion>(`${this.baseUrl}`, categorieQuestion.toJSON()).toPromise();
  }
  update(categorieQuestion: CategorieQuestion): Promise<ICategorieQuestion | string> {
    return this.http.put<ICategorieQuestion>(`${this.baseUrl}${categorieQuestion.idCategorie}`, categorieQuestion.toJSON()).toPromise();
  }
  delete(categorieQuestion: ICategorieQuestion): Promise<string> {
    return this.http.delete<string>(`${this.baseUrl}${categorieQuestion.idCategorie}`).toPromise();
  }
}
