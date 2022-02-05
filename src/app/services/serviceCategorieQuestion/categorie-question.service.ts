import IMetier from '@/interfaces/IMetier';
import PreconisationCategorieQuestion from '@/interfaces/PreconisationCategorieQuestion';
import Metier from '@/objects/Metier';
import Question from '@/objects/Question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import CategorieQuestion from '../../interfaces/CategorieQuestion';
import IQuestion from '../../interfaces/IQuestion';

@Injectable({
  providedIn: 'root'
})
export class CategorieQuestionService {

  private baseUrl: string = environment.apiUrl + '/categoriesQuestion';

  constructor(private http: HttpClient) {}


  getAllQuestionsCategoriesQuestion(categorieQuestionId: string): Observable<Question[]> {
    return this.http.get<IQuestion[]>(`${this.baseUrl}/${categorieQuestionId}/Questions`).pipe(map((receivedData: IQuestion[]) => {
      return receivedData.map<Question>((value: IQuestion, index:number, array:IQuestion[]) => {
        return new Question(
        value.idQuestion, 
        value.type,
        value.libelleQuestion,
        value.metiers.map<Metier>((value: IMetier, index:number, array:IMetier[]) => {
          return new Metier(
          value.idMetier, 
          value.nomMetier
        )
        })
      );
      });
  }));
  }


  getAllPreconisationCategoriesQuestion(categorieQuestionId: string): Observable<PreconisationCategorieQuestion[]> {
    return this.http.get<PreconisationCategorieQuestion[]>(`${this.baseUrl}/${categorieQuestionId}/PreconisationCategoriesQuestion`);
  }
  createQuestionCategoriesQuestion(categorieQuestionId: string, question: Question): Observable<IQuestion | string>{
    return this.http.post<IQuestion>(`${this.baseUrl}/${categorieQuestionId}/Questions`, question.toJSON());
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
