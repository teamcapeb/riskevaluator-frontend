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
  private baseUrl: string = environment.apiUrl + '/questionnaires/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Questionnaire[]> {
    return this.http.get<IQuestionnaire[]>(`${this.baseUrl}`).pipe(map((iQuestionnaires: IQuestionnaire[]) => {
        return iQuestionnaires.map((iQuestionnaire: IQuestionnaire) => {
          return Questionnaire.toQuestionnaire(iQuestionnaire);
        });
    }));
  }

  get(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<IQuestionnaire>(`${this.baseUrl}${questionnaireId}`).pipe(map((iQuestionnaire: IQuestionnaire) => {
     return Questionnaire.toQuestionnaire(iQuestionnaire);
    }));
  }

  create(questionnaire: Questionnaire): Promise<IQuestionnaire | string>{
    return this.http.post<IQuestionnaire>(`${this.baseUrl}`, questionnaire.toJSON()).toPromise();
  }

  update(questionnaire: Questionnaire): Promise<IQuestionnaire | string> {
    return this.http.put<IQuestionnaire>(`${this.baseUrl}${questionnaire.idQuestionnaire}`, questionnaire.toJSON()).toPromise();
  }

  delete(questionnaire: Questionnaire): Promise<IQuestionnaire | string> {
    return this.http.delete<IQuestionnaire>(`${this.baseUrl}${questionnaire.idQuestionnaire}`).toPromise();
  }

  getCategoriesQuestions(questionnaireId: number, metiers : number[]) : Observable<ICategorieQuestion[]> {

    let joindMetiers:string;

    if(metiers.length >0 )
      joindMetiers = "metierId=" + metiers.join("&metierId=");

    return this.http.get<ICategorieQuestion[]>(`${this.baseUrl}${questionnaireId}/questions?${joindMetiers}`)
  }

  getListQuestionnaire(metiers : number[]) : Observable<Questionnaire[]> {

    let joindMetiers:string;

    if(metiers.length >0 )
      joindMetiers = "metierId=" + metiers.join("&metierId=");

    return this.http.get<IQuestionnaire[]>(`${this.baseUrl}bymetierids?${joindMetiers}`).pipe(map((receivedData: IQuestionnaire[]) => {
      return receivedData.map<Questionnaire>((iQuestionnaire: IQuestionnaire) => {
        return Questionnaire.toQuestionnaire(iQuestionnaire);
      });
    }));
  }


}
