import ICompte from "./ICompte";
import { IEntreprise } from "./IEntreprise";
import { IMetier } from "./IMetier";
import IScoreCategory from "./IScoreCategory";

export default interface IEvaluation{
    filterResponses?: any;
    idEvaluation?: number;
    compte?: ICompte;
    scoreGeneraleEvaluation? : number
    scoreCategories?: IScoreCategory[],
    entreprise : IEntreprise,
    date?: string,
    metiers?: IMetier[]
}
