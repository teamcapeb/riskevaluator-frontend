import ICategorieQuestion from "./ICategorieQuestion";
import IEvaluation from "./IEvaluation";

export default interface IScoreCategory{
    evaluation?: IEvaluation;
    categorieQuestion?: ICategorieQuestion;
    nbPoints?: number;
}
