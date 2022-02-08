import IMetier from "./IMetier";
import IReponse from './IReponse';

export default interface IQuestion {
    idQuestion: string;
    type: string;
    libelleQuestion: string;
    metiers: IMetier[];
    reponses: IReponse[];
}