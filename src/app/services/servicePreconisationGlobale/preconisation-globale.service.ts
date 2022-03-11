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

  private baseUrl: string = environment.apiUrl + '/preconisationglobale/';

  constructor(private http: HttpClient) {}

  create(preconisation: PreconisationGlobale): Promise<PreconisationGlobale | string>{
    return this.http.post<PreconisationGlobale>(`${this.baseUrl}`, preconisation.toJSON()).toPromise();
  }

  update(preconisationGlobale: PreconisationGlobale): Promise<IPreconisationGlobale | string> {
    return this.http.put<IPreconisationGlobale>(`${this.baseUrl}`, preconisationGlobale.toJSON()).toPromise();
  }

  delete(preconisationGlobale: IPreconisationGlobale): Promise<string> {
    return this.http.delete<string>(`${this.baseUrl}${preconisationGlobale.idPreconisationG}`).toPromise();
  }
  get(pourcentage : number) : Observable<IPreconisationGlobale> {
    return this.http.get<IPreconisationGlobale>(`${this.baseUrl}pourcentage/${pourcentage}`)
  }
}
