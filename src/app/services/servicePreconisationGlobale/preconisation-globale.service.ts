import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import IPreconisationGlobale from '@/interfaces/IPreconisationGlobale';
import PreconisationGlobale from '@/objects/PreconisationGlobale';


@Injectable({
  providedIn: 'root'
})
export class PreconisationGlobaleService {

  private baseUrl: string = environment.apiUrl + '/preconisationGlobales/';

  constructor(private http: HttpClient) {}

  create(preconisation: PreconisationGlobale) {
    return this.http.post<PreconisationGlobale>(`${this.baseUrl}`, preconisation.toJSON());
  }

  update(preconisationGlobale: PreconisationGlobale) {
    return this.http.put<IPreconisationGlobale>(`${this.baseUrl}${preconisationGlobale.idPreconisationG}`, preconisationGlobale.toJSON());
  }

  delete(preconisationGlobale: IPreconisationGlobale) {
    return this.http.delete<string>(`${this.baseUrl}${preconisationGlobale.idPreconisationG}`);
  }
  get(pourcentage : number) : Observable<IPreconisationGlobale> {
    return this.http.get<IPreconisationGlobale>(`${this.baseUrl}pourcentage/${pourcentage}`)
  }
}
