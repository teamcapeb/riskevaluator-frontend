import ICompte from '@/interfaces/ICompte';
import IScoreCategory from '@/interfaces/IScoreCategory';
import IEvaluation from '../interfaces/IEvaluation';
import Compte from './Compte';
import ScoreCategory from './ScoreCategory';
import {IEntreprise} from "@/interfaces/IEntreprise";
export default class Evaluation{

    public idEvaluation: number;
    public compte: Compte;
    public scoreCategories: ScoreCategory[]
    public entreprise:IEntreprise

    constructor(
        idEvaluation: number,
        iCompte: ICompte,
        iEntreprise: IEntreprise,
        iScoreCategories: IScoreCategory[]
    ){
        this.idEvaluation = idEvaluation;
        this.entreprise=iEntreprise;
        this.compte = Compte.toCompte(iCompte);
        this.scoreCategories = iScoreCategories.map((iScoreCategory: IScoreCategory) => {
            return ScoreCategory.toScoreCategory(iScoreCategory);
        });
    }

    public static toEvaluation(iEvaluation: IEvaluation): Evaluation{
        return new Evaluation(
            iEvaluation.idEvaluation,
            iEvaluation.compte,
            iEvaluation.entreprise,
            iEvaluation.scoreCategories
        );
    }

    public toJSON(): IEvaluation{
        let iScoreCategories: IScoreCategory[] = this.scoreCategories.map((scoreCategory: ScoreCategory) => {
            return scoreCategory.toJSON();
        });
        return {
            "idEvaluation": this.idEvaluation,
            "compte": this.compte.toJSON(),
            "scoreCategories": iScoreCategories,
            "entreprise": this.entreprise
        }
    }
}
