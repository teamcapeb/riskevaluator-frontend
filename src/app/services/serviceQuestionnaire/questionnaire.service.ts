import IQuestion from '@/interfaces/IQuestion';
import IQuestionnaire from '@/interfaces/IQuestionnaire';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import IPreconisationGlobale from '@/interfaces/IPreconisationGlobale';
import { map } from 'rxjs/operators';
import PreconisationGlobale from '@/objects/PreconisationGlobale';
import Questionnaire from '@/objects/Questionnaire';
import CategorieQuestion from '@/objects/CategorieQuestion';
import ICategorieQuestion from '@/interfaces/ICategorieQuestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private baseUrl: string = environment.apiUrl + '/Questionnaires';
  constructor(private http: HttpClient) {}


  getAllPreconisationGlobale(questionnaireId: string): Observable<PreconisationGlobale[]> {
    return this.http.get<IPreconisationGlobale[]>(`${this.baseUrl}/${questionnaireId}/PreconisationGlobale`).pipe(map((receivedData: IPreconisationGlobale[]) => {
      return receivedData.map<PreconisationGlobale>((value: IPreconisationGlobale, index:number, array:IPreconisationGlobale[]) => {
        return new PreconisationGlobale(
        value.idPreconisationGlobale,
        value.viewIfPourcentageScoreLessThan,
        value.Contenue
      )
      });
  }));  }

  getAllCategoriesQuestion(questionnaireId: string): Observable<CategorieQuestion[]> {
    return this.http.get<ICategorieQuestion[]>(`${this.baseUrl}/${questionnaireId}/categoriesQuestion`).pipe(map((receivedData: ICategorieQuestion[]) => {
      return receivedData.map<CategorieQuestion>((value: ICategorieQuestion, index:number, array:ICategorieQuestion[]) => {
        return new CategorieQuestion(
        value.idCategoriesQuestion,
        value.libelle
      )
      });
  }));

  }

  getAll(): Observable<Questionnaire[]> {
    return this.http.get<IQuestionnaire[]>(`${this.baseUrl}`).pipe(map((receivedData: IQuestionnaire[]) => {
        return receivedData.map<Questionnaire>((value: IQuestionnaire, index:number, array:IQuestionnaire[]) => {
          return new Questionnaire(
          value.idQuestionnaire,
          value.thematique,
          value.preconisationsGlobales.map<PreconisationGlobale>((value: IPreconisationGlobale
            , index:number, array:IPreconisationGlobale[]) => {
            return new PreconisationGlobale(
            value.idPreconisationGlobale,
            value.viewIfPourcentageScoreLessThan,
            value.Contenue
          )
          }),
          value.categoriesQuestions.map<CategorieQuestion>((value: ICategorieQuestion
            , index:number, array:ICategorieQuestion[]) => {
            return new CategorieQuestion(
            value.idCategoriesQuestion,
            value.libelle,
          )
          }),
        )
        });
    }));}

  get(questionnaireId: string): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.baseUrl}/${questionnaireId}`);
  }

  createPreconisationGlobale(questionnaireId: string, preconisation: PreconisationGlobale): Observable<PreconisationGlobale | string>{
    return this.http.post<PreconisationGlobale>(`${this.baseUrl}/${questionnaireId}/PreconisationGlobale`, preconisation);
  }

  createCategorieQuestion(questionnaireId: string, categorieQuestion: ICategorieQuestion): Observable<ICategorieQuestion | string>{
    return this.http.post<ICategorieQuestion>(`${this.baseUrl}/${questionnaireId}/categoriesQuestion`, categorieQuestion);
  }

  update(questionnaireId: string, questionnaire: Questionnaire): Observable<Questionnaire | string> {
    return this.http.put<Questionnaire>(`${this.baseUrl}/${questionnaireId}`, questionnaire);
  }

  delete(questionId: string): Observable<Questionnaire | string> {
    return this.http.delete<Questionnaire>(`${this.baseUrl}/${questionId}`);
  }

  create(questionnaire: Questionnaire): Observable<IQuestionnaire | string>{
    return this.http.post<IQuestionnaire>(`${this.baseUrl}`, questionnaire.toJSON());
  }
}
