import IMetier from '@/interfaces/IMetier';
import Metier from '@/objects/Metier';
import PreconisationCategorieQuestion from '@/objects/PreconisationCategorieQuestion';
import Question from '@/objects/Question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import CategorieQuestion from '../../interfaces/CategorieQuestion';
import IQuestion from '../../interfaces/IQuestion';
import IReponse from '../../interfaces/IReponse';
import Reponse from '../../objects/Reponse';
import IPreconisationCategorieQuestion from '@/interfaces/IPreconisationCategorieQuestion';


@Injectable({
  providedIn: 'root'
})
export class CategorieQuestionService {

  private baseUrl: string = environment.apiUrl + '/categoriesQuestion';

  constructor(private http: HttpClient) {}

  getAllPreconisationCategoriesQuestion(categorieQuestionId: string): Observable<PreconisationCategorieQuestion[]> {
    return this.http.get<PreconisationCategorieQuestion[]>(`${this.baseUrl}/${categorieQuestionId}/PreconisationCategoriesQuestion`).pipe(map((receivedData: IPreconisationCategorieQuestion[]) => {
      return receivedData.map<PreconisationCategorieQuestion>((value: IPreconisationCategorieQuestion, index:number, array:IPreconisationCategorieQuestion[]) => {
        return new PreconisationCategorieQuestion(
          value.idPreconisationCategoriesQuestion,
          value.viewIfPourcentageScoreLessThan,
          value.Contenue
        )
      });
    }));
  }

  getAllQuestionsCategoriesQuestion(categorieQuestionId: string): Observable<Question[]> {
    return this.http.get<IQuestion[]>(`${this.baseUrl}/${categorieQuestionId}/Questions`).pipe(map((receivedData: IQuestion[]) => {
      return receivedData.map<Question>((valueQ: IQuestion, index:number, array:IQuestion[]) => {
        return new Question(
          valueQ.idQuestion,
          valueQ.type,
          valueQ.libelleQuestion,
          valueQ.metiers.map<Metier>((valueM: IMetier, index:number, array:IMetier[]) => {
          return new Metier(
            valueM.idMetier,
            valueM.nomMetier
          )}),
          valueQ.reponses.map<Reponse>((value: IReponse, index:number, array:IReponse[]) => {
          return new Reponse(
            value.idReponse,
            value.nbPoints,
            value.contenu
          )
        })
      );
    })}));
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
