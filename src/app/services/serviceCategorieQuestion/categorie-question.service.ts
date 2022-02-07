import IMetier from '@/interfaces/IMetier';
import PreconisationCategorieQuestion from '@/interfaces/PreconisationCategorieQuestion';
import CategorieQuestion from '@/objects/CategorieQuestion';
import Metier from '@/objects/Metier';
import Question from '@/objects/Question';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ICategorieQuestion from '../../interfaces/ICategorieQuestion';
import IQuestion from '../../interfaces/IQuestion';
import IReponse from '../../interfaces/IReponse';
import Reponse from '../../objects/Reponse';

@Injectable({
  providedIn: 'root'
})
export class CategorieQuestionService {

  private baseUrl: string = environment.apiUrl + '/categoriesQuestion';

  constructor(private http: HttpClient) {}


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


  getAllPreconisationCategoriesQuestion(categorieQuestionId: string): Observable<PreconisationCategorieQuestion[]> {
    return this.http.get<PreconisationCategorieQuestion[]>(`${this.baseUrl}/${categorieQuestionId}/PreconisationCategoriesQuestion`);
  }
  createQuestionCategoriesQuestion(categorieQuestionId: string, question: Question): Observable<IQuestion | string>{
    return this.http.post<IQuestion>(`${this.baseUrl}/${categorieQuestionId}/Questions`, question.toJSON());
  }

  createPreconisationCategoriesQuestion(questionnaireId: string, preconisation: PreconisationCategorieQuestion): Observable<PreconisationCategorieQuestion | string>{
    return this.http.post<PreconisationCategorieQuestion>(`${this.baseUrl}/${questionnaireId}/PreconisationCategoriesQuestion`, preconisation);
  }


  getAll(): Observable<CategorieQuestion[]> {
    return this.http.get<ICategorieQuestion[]>(`${this.baseUrl}`).pipe(map((receivedData: ICategorieQuestion[]) => {
        return receivedData.map<CategorieQuestion>((value: ICategorieQuestion, index:number, array:ICategorieQuestion[]) => {
          return new CategorieQuestion(
          value.idCategoriesQuestion,
          value.libelle
        )
        });
    }));
  }


  create(categorieQuestion: CategorieQuestion): Observable<ICategorieQuestion | string>{
    return this.http.post<ICategorieQuestion>(`${this.baseUrl}`, categorieQuestion.toJSON());
  }

  get(categorieQuestionId: string): Observable<CategorieQuestion> {
    return this.http.get<ICategorieQuestion>(`${this.baseUrl}/${categorieQuestionId}`).pipe(map((receivedData: ICategorieQuestion) => {
      return new CategorieQuestion(
          receivedData.idCategoriesQuestion,
          receivedData.libelle
      )
}));

  }

  update(categorieQuestion: ICategorieQuestion): Observable<ICategorieQuestion | string> {
    return this.http.put<ICategorieQuestion>(`${this.baseUrl}/${categorieQuestion.idCategoriesQuestion}`, categorieQuestion);
  }

  delete(categorieQuestion: ICategorieQuestion): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${categorieQuestion.idCategoriesQuestion}`);
  }
}
