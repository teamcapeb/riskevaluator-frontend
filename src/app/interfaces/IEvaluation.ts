import ICompte from "./ICompte";
import IScoreCategory from "./IScoreCategory";

export default interface IEvaluation{
    idEvaluation: number;
    compte: ICompte;
    scoreCategories: IScoreCategory[]
}