import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IMetier from '../../interfaces/IMetier';
import Metier from '../../objects/Metier';

@Injectable({
  providedIn: 'root'
})
export class MetierService {

  private baseUrl: string = environment.apiUrl + '/Metiers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Metier[]> {
    return this.http.get<IMetier[]>(`${this.baseUrl}`).pipe(map((receivedData: IMetier[]) => {
        return receivedData.map<Metier>((value: IMetier, index:number, array:IMetier[]) => {
          return new Metier(
          value.idMetier, 
          value.nomMetier
        )
        });
    }));
  }

  create(metier: Metier): Observable<IMetier | string>{
    return this.http.post<IMetier>(`${this.baseUrl}`, metier.toJSON());
  }

  get(metierId: string): Observable<Metier> {
    return this.http.get<IMetier>(`${this.baseUrl}/${metierId}`).pipe(map((receivedData: IMetier) => {
            return new Metier(
                receivedData.idMetier, 
                receivedData.nomMetier
            )
    }));
  }

  update(metier: IMetier): Observable<IMetier | string> {
    return this.http.put<IMetier>(`${this.baseUrl}/${metier.idMetier}`, metier);
  }

  delete(metier: IMetier): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${metier.idMetier}`);
  }
}
