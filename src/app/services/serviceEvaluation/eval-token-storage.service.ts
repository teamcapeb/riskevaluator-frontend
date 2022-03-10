import { IEntreprise } from '@/interfaces/IEntreprise';
import IEvaluation from '@/interfaces/IEvaluation';
import { IUser } from '@/interfaces/IUser';
import { Injectable } from '@angular/core';

const EVAL_KEY = 'eval-key';
const ENTRE_KEY = 'entre-key';

@Injectable({
  providedIn: 'root'
})
export class EvalTokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveEvaluationById(evaluation : number) {
    window.sessionStorage.removeItem(EVAL_KEY);
    window.sessionStorage.setItem(EVAL_KEY, evaluation.toString());
  }

  public getEvaluationById() : number {
    return +sessionStorage.getItem(EVAL_KEY);
  }

  public saveEvaluation(user: IEvaluation) {
    window.sessionStorage.removeItem(EVAL_KEY);
    window.sessionStorage.setItem(EVAL_KEY, JSON.stringify(user));
  }

  public getEvaluation() : IEvaluation {
    return JSON.parse(sessionStorage.getItem(EVAL_KEY));
  }

  public saveEntreprise(entreprise: IEntreprise) {
    window.sessionStorage.removeItem(ENTRE_KEY);
    window.sessionStorage.setItem(ENTRE_KEY, JSON.stringify(entreprise));
  }

  public getEntreprise() : IEntreprise {
    return JSON.parse(sessionStorage.getItem(ENTRE_KEY));
  }
}
