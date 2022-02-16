import IMetier from "./IMetier";
import IReponse from './IReponse';
import ICategorieQuestion from './ICategorieQuestion';

export default interface IQuestion {
    idQuestion: number;
    scoreMaxPossibleQuestion: number;
    categorieQuestion?: ICategorieQuestion;
    typeQuestion: string; // type : QuestionType ?
    libelleQuestion: string;
    metiers?: IMetier[];
    reponses?: IReponse[];
}
