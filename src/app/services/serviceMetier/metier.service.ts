import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IMetier from '../../interfaces/IMetier';
import Metier from '../../objects/Metier';
import IQuestionnaire from "@/interfaces/IQuestionnaire";

@Injectable({
  providedIn: 'root'
})
export class MetierService {

  private baseUrl: string = environment.apiUrl + '/metiers/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IMetier[]> {
    return this.http.get<IMetier[]>(`${this.baseUrl}`);
  }

  create(metier: Metier): Promise<IMetier | string>{
    return this.http.post<IMetier>(`${this.baseUrl}`, metier.toJSON()).toPromise();
  }

  update(metier: IMetier): Promise<IMetier | string> {
    return this.http.put<IMetier>(`${this.baseUrl}/${metier.idMetier}`, metier).toPromise();
  }

  delete(metier: IMetier): Promise<string> {
    return this.http.delete<string>(`${this.baseUrl}/${metier.idMetier}`).toPromise();
  }
}
