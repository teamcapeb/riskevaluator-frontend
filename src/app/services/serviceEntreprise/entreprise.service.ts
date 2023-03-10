import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {IEntreprise} from '../../interfaces/IEntreprise';
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import { EntrepriseScoreProjectionResponse } from '../../objects/EntrepriseScoreProjectionResponse';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private baseUrl: string = environment.apiUrl + '/entreprises/';

  constructor(private http: HttpClient) {}

  getById(siret: number) {
    return this.http.get<IEntreprise>(`${this.baseUrl}${siret}`)
  }

  exists(siret: string) {
    return this.http.get(`${this.baseUrl}${siret}/exists`);
  }

  getAll(): Observable<IEntreprise[]> {
    return this.http.get<IEntreprise[]>(`${this.baseUrl}`);
  }

  create(entreprise: IEntreprise) {
    return this.http.post<IEntreprise>(`${this.baseUrl}`, entreprise);
  }

  update(id: number, entreprise: IEntreprise) {
    return this.http.put<IEntreprise>(`${this.baseUrl}${id}`, entreprise);
  }

  get(noSiret: number): Observable<IEntreprise> {
    return this.http.get<IEntreprise>(`${this.baseUrl}${noSiret}`);
  }

  getScoreEntreprises():Observable<EntrepriseScoreProjectionResponse[]> {
    return this.http.get<EntrepriseScoreProjectionResponse[]>(`${this.baseUrl}scores/all`);
  }

  getDetailedScoreEntreprises():Observable<EntrepriseScoreProjectionResponse[]> {
    return this.http.get<EntrepriseScoreProjectionResponse[]>(`${this.baseUrl}scores/detailed`);
  }
 }
