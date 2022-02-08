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
    return this.http.get<IQuestionnaire[]>(`${this.baseUrl}`).pipe(map((iuestionnaires: IQuestionnaire[]) => {
        return iuestionnaires.map<Questionnaire>((iQuestionnaire: IQuestionnaire) => {
          return Questionnaire.toQuestionnaire(iQuestionnaire);
        });
    }));
  }

  get(questionnaireId: number): Observable<Questionnaire> {
    return this.http.get<IQuestionnaire>(`${this.baseUrl}${questionnaireId}`).pipe(map((iQuestionnaire: IQuestionnaire) => {
     return Questionnaire.toQuestionnaire(iQuestionnaire);
    }));
  }

  createPreconisationGlobale(questionnaireId: string, preconisation: PreconisationGlobale): Promise<PreconisationGlobale | string>{
    return this.http.post<PreconisationGlobale>(`${this.baseUrl}${questionnaireId}/PreconisationGlobale`, preconisation.toJSON()).toPromise();
  }

  createCategorieQuestion(questionnaireId: string, categorieQuestion: CategorieQuestion): Promise<ICategorieQuestion | string>{
    return this.http.post<ICategorieQuestion>(`${this.baseUrl}${questionnaireId}/categoriesQuestion`, categorieQuestion.toJSON()).toPromise();
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

}
