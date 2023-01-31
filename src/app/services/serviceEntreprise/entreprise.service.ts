import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {IEntreprise} from '../../interfaces/IEntreprise';
import IQuestionnaire from "@/interfaces/IQuestionnaire";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private baseUrl: string = environment.apiUrl + '/entreprises/';

  constructor(private http: HttpClient) {}


  getAll(): Observable<IEntreprise[]> {
    return this.http.get<IEntreprise[]>(`${this.baseUrl}`);
  }

  create(entreprise: IEntreprise) {
    return this.http.post<IEntreprise>(`${this.baseUrl}`, entreprise);
  }

  update(entreprise: IEntreprise) {
    return this.http.put<IEntreprise>(`${this.baseUrl}`, entreprise);
  }
 }
