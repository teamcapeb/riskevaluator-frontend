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

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl: string = environment.apiUrl + '/Questions';

  constructor(private http: HttpClient) {}

  getAllReponses(questionId: string): Observable<Reponse[]> {
    return this.http.get<IReponse[]>(`${this.baseUrl}/${questionId}/Reponses`).pipe(map((receivedData: IReponse[]) => {
      return receivedData.map<Reponse>((value: IReponse, index: number, array: IReponse[]) => {
        return new Reponse(
          value.idReponse,
          value.nbPoints,
          value.contenu
      )
      });
    }));
  }

  createReponse(questionId: string, reponse: IReponse): Observable<IReponse | string>{
    return this.http.post<IReponse>(`${this.baseUrl}/${questionId}/Reponses`, reponse);
  }

  get(questionId: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${this.baseUrl}/${questionId}`);
  }

  update(question: Question): Observable<IQuestion | string> {
    return this.http.put<IQuestion>(`${this.baseUrl}/${question.idQuestion}`, question.toJSON());
  }

  delete(questionId: string): Observable<IQuestion | string> {
    return this.http.delete<IQuestion>(`${this.baseUrl}/${questionId}`);
  }


}
