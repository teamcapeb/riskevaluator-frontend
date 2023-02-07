import { IMetier } from './IMetier';
import IEvaluation from "./IEvaluation";

export interface  IEntreprise{
  noSiret: number;
  nomEntreprise: string;
  effectif: number;
  anneeDeCreation: number;
  evaluations?: IEvaluation[];
  metiers?: IMetier[];
}
