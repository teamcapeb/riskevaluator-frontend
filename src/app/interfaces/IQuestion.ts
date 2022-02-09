import IMetier from "./IMetier";
import IReponse from './IReponse';
import ICategorieQuestion from './ICategorieQuestion';

export default interface IQuestion {
    idQuestion: number;
    categorieQuestion?: ICategorieQuestion
    qType: string; // type : QuestionType ?
    aide: string;
    libelleQuestion: string;
    metiers?: IMetier[];
    reponses?: IReponse[];
}