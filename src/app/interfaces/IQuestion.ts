import IMetier from "./IMetier";
import IReponse from './IReponse';
import ICategorieQuestion from './ICategorieQuestion';
import { IQuestionType } from "./IQuestionType";

export default interface IQuestion {
    idQuestion: number;
    categorieQuestion?: ICategorieQuestion
    typeQuestion?: string; // type : IQuestionType ?
    aide?: string;
    libelleQuestion?: string;
    scoreMaxPossibleQuestion?: number;
    metiers?: IMetier[];
    reponses?: IReponse[];
}
