import ICategorieQuestion from "./ICategorieQuestion";
import IEvaluation from "./IEvaluation";

export default interface IScoreCategory{
    evaluation: IEvaluation;
    categorie: ICategorieQuestion;
    nbPoints: number;
}