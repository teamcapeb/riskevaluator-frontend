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

  private baseUrl: string = environment.apiUrl + '/PreconisationGlobale';

  constructor(private http: HttpClient) {}


  getAll(): Observable<PreconisationGlobale[]> {
    return this.http.get<IPreconisationGlobale[]>(`${this.baseUrl}`).pipe(map((receivedData: IPreconisationGlobale[]) => {
        return receivedData.map<PreconisationGlobale>((value: IPreconisationGlobale, index:number, array:IPreconisationGlobale[]) => {
          return new PreconisationGlobale(
          value.idPreconisationGlobale,
          value.viewIfPourcentageScoreLessThan,
          value.Contenue
        )
        });
    }));
  }

  create(preconisationGlobale: PreconisationGlobale): Observable<IPreconisationGlobale | string>{
    return this.http.post<IPreconisationGlobale>(`${this.baseUrl}`, preconisationGlobale.toJSON());
  }


  get(preconisationGlobaleId: string): Observable<PreconisationGlobale> {
    return this.http.get<IPreconisationGlobale>(`${this.baseUrl}/${preconisationGlobaleId}`).pipe(map((receivedData: IPreconisationGlobale) => {
            return new PreconisationGlobale(
                receivedData.idPreconisationGlobale,
                receivedData.viewIfPourcentageScoreLessThan,
                receivedData.Contenue
            )
    }));
  }

  update(preconisationGlobale: IPreconisationGlobale): Observable<IPreconisationGlobale | string> {
    return this.http.put<IPreconisationGlobale>(`${this.baseUrl}/${preconisationGlobale.idPreconisationGlobale}`, preconisationGlobale);
  }

  delete(preconisationGlobale: IPreconisationGlobale): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${preconisationGlobale.idPreconisationGlobale}`);
  }
}
