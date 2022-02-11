import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IEvaluation from "@/interfaces/IEvaluation";
import IScoreCategory from "@/interfaces/IScoreCategory";
import CategorieQuestion from "./CategorieQuestion";
import Evaluation from "./Evaluation";

export default class ScoreCategory{
    private evaluation: Evaluation;
    private categorie: CategorieQuestion;
    private nbPoints: number;

    constructor(
        iEvaluation: IEvaluation,
        iCategorie: ICategorieQuestion,
        nbPoints: number
    ){
        this.evaluation = Evaluation.toEvaluation(iEvaluation);
        this.categorie = CategorieQuestion.toCategorieQuestion(iCategorie);
        this.nbPoints = nbPoints;
    }

    public static toScoreCategory(iScoreCategory: IScoreCategory): ScoreCategory{
        return new ScoreCategory(
            iScoreCategory.evaluation,
            iScoreCategory.categorie,
            iScoreCategory.nbPoints
        );
    }

    public toJSON(): IScoreCategory {
        return {
            "evaluation": this.evaluation.toJSON(),
            "categorie": this.categorie.toJSON(),
            "nbPoints": this.nbPoints
        }
    }
}