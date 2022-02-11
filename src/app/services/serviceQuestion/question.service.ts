import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

import PreconisationGlobale from '@/objects/PreconisationGlobale';

import IQuestion from '../../interfaces/IQuestion';
import IReponse from '../../interfaces/IReponse';
import Question from '@/objects/Question';
import Reponse from '../../objects/Reponse';
import { map } from 'rxjs/operators';
import PreconisationCategorieQuestion from '@/objects/PreconisationCategorieQuestion';
import IPreconisationCategorieQuestion from '@/interfaces/IPreconisationCategorieQuestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl: string = environment.apiUrl + '/questions/';

  constructor(private http: HttpClient) {}

  get(questionId: string): Observable<Question> {
    return this.http.get<IQuestion>(`${this.baseUrl}${questionId}`).pipe(map((iQuestion: IQuestion) => {
      return Question.toQuestion(iQuestion);
    }));
  }

  createReponse(questionId: string, reponse: IReponse): Promise<IReponse | string>{
    return this.http.post<IReponse>(`${this.baseUrl}${questionId}/Reponses`, reponse).toPromise();
  }

  update(question: Question): Promise<IQuestion | string> {
    return this.http.put<IQuestion>(`${this.baseUrl}${question.idQuestion}`, question.toJSON()).toPromise();
  }

  delete(questionId: string): Promise<IQuestion | string> {
    return this.http.delete<IQuestion>(`${this.baseUrl}${questionId}`).toPromise();
  }
  
}
