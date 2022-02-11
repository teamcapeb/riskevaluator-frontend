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

  private baseUrl: string = environment.apiUrl + '/metiers/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Metier[]> {
    return this.http.get<IMetier[]>(`${this.baseUrl}`).pipe(map((receivedData: IMetier[]) => {
        return receivedData.map<Metier>((iMetier: IMetier) => {
          return Metier.toMetier(iMetier);
        });
    }));
  }

  create(metier: Metier): Promise<IMetier | string>{
    return this.http.post<IMetier>(`${this.baseUrl}`, metier.toJSON()).toPromise();
  }

  update(metier: Metier): Promise<IMetier | string> {
    return this.http.put<IMetier>(`${this.baseUrl}`, metier.toJSON()).toPromise();
  }

  delete(metier: Metier): Promise<string> {
    return this.http.delete<string>(`${this.baseUrl}${metier.idMetier}`).toPromise();
  }
}
