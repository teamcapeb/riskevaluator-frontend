import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import Metier from '../../interfaces/Metier';

@Injectable({
  providedIn: 'root'
})
export class MetierService {

  private baseUrl: string = environment.apiUrl + '/Metiers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Metier[]> {
    return this.http.get<Metier[]>(`${this.baseUrl}`);
  }

  create(metier: Metier): Observable<Metier | string>{
    return this.http.post<Metier>(`${this.baseUrl}`, metier);
  }

  get(metierId: string): Observable<Metier> {
    return this.http.get<Metier>(`${this.baseUrl}/${metierId}`);
  }

  update(metierId: string, metier: Metier): Observable<Metier | string> {
    return this.http.put<Metier>(`${this.baseUrl}/${metierId}`, metier);
  }

  delete(metierId: string): Observable<Metier | string> {
    return this.http.delete<Metier>(`${this.baseUrl}/${metierId}`);
  }
}
