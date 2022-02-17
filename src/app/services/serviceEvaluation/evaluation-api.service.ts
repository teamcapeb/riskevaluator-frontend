import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import Question from "@/objects/Question";
import IQuestion from "@/interfaces/IQuestion";
import { map } from "rxjs/operators";
import IReponse from "@/interfaces/IReponse";
import IEvaluation from '@/interfaces/IEvaluation';


const API_URL = environment.apiUrl +'/evaluations';

@Injectable({
  providedIn: 'root'
})
export class EvaluationApiService {

  constructor(private http: HttpClient) { }

  get(evaluationId: string): Observable<IEvaluation> {
    return this.http.get<IEvaluation>(`${API_URL}/${evaluationId}`);
  }

   create(reponse: IEvaluation): Observable<IEvaluation>{
    return this.http.post<IEvaluation>(`${API_URL}/`, reponse);
  }

  update(evaluation: IEvaluation): Observable<IEvaluation> {
    return this.http.put<IEvaluation>(`${API_URL}/`, evaluation);
  }

  delete(evaluationId: string): Observable<any> {
    return this.http.delete(`${API_URL}/${evaluationId}`);
  }
}
