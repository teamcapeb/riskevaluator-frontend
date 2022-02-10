import IMetier from "./IMetier";
import IReponse from './IReponse';
import ICategorieQuestion from './ICategorieQuestion';
import { IQuestionType } from "./IQuestionType";

export default interface IQuestion {
    idQuestion: number;
    categorieQuestion?: ICategorieQuestion
    typeQuestion: IQuestionType; // type : IQuestionType ?
    aide: string;
    libelleQuestion: string;
    metiers?: IMetier[];
    reponses?: IReponse[];
}
