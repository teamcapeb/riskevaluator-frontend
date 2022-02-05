import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import Question from '../../interfaces/Question';
import Reponse from '../../interfaces/Reponse';
import IPreconisationGlobale from '@/interfaces/IPreconisationGlobale';
import { map } from 'rxjs/operators';
import PreconisationGlobale from '@/objects/PreconisationGlobale';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl: string = environment.apiUrl + '/Questions';

  constructor(private http: HttpClient) {}

  getAllReponses(questionId: string): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.baseUrl}/${questionId}/Reponses`);
  }

  createReponse(questionId: string, reponse: Reponse): Observable<Reponse | string>{
    return this.http.post<Reponse>(`${this.baseUrl}/${questionId}/Reponses`, reponse);
  }

  get(questionId: string): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${questionId}`);
  }

  update(questionId: string, question: Question): Observable<Question | string> {
    return this.http.put<Question>(`${this.baseUrl}/${questionId}`, question);
  }

  delete(questionId: string): Observable<Question | string> {
    return this.http.delete<Question>(`${this.baseUrl}/${questionId}`);
  }


}
