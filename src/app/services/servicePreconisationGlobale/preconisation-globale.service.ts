import PreconisationGlobale from '@/interfaces/PreconisationGlobale';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreconisationGlobaleService {

  private baseUrl: string = environment.apiUrl + '/PreconisationGlobale';

  constructor(private http: HttpClient) {}

  get(preconisationGlobaleId: string): Observable<PreconisationGlobale> {
    return this.http.get<PreconisationGlobale>(`${this.baseUrl}/${preconisationGlobaleId}`);
  }

  update(preconisationGlobaleId: string, preconisationGlobale: PreconisationGlobale): Observable<PreconisationGlobale | string> {
    return this.http.put<PreconisationGlobale>(`${this.baseUrl}/${preconisationGlobaleId}`, preconisationGlobale);
  }

  delete(preconisationGlobaleId: string): Observable<PreconisationGlobale | string> {
    return this.http.delete<PreconisationGlobale>(`${this.baseUrl}/${preconisationGlobaleId}`);
  }
}
