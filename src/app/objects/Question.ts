import IMetier from "@/interfaces/IMetier";
import IQuestion from "@/interfaces/IQuestion";
import Metier from './Metier';
import Reponse from './Reponse';
import IReponse from '../interfaces/IReponse';
import CategorieQuestion from "./CategorieQuestion";

export default class Question {
    idQuestion: number;
    categorieQuestion: CategorieQuestion
    aide: string;
    qType: string;
    libelleQuestion: string;
    metiers: Metier[];
    reponses: Reponse[];

    constructor(idQuestion: number, qType: string, libelleQuestion: string, metiers: IMetier[], reponses: IReponse[]){
        this.idQuestion = idQuestion;
        this.qType = qType;
        this.libelleQuestion = libelleQuestion;
        this.metiers = metiers.map((iMetier: IMetier) => {
            return Metier.toMetier(iMetier);
        });
        this.reponses = reponses.map((iReponse: IReponse) => {
            return Reponse.toReponse(iReponse);
        });
    }

    public static toQuestion(iQuestion: IQuestion): Question{
        return new Question(
            iQuestion.idQuestion,
            iQuestion.qType,
            iQuestion.libelleQuestion,
            iQuestion.metiers,
            iQuestion.reponses
        );
    }

    public toJSON(): IQuestion{
        let metiers: IMetier[] = this.metiers.map((metier: Metier) => {
            return metier.toJSON();
        });
        let reponses: IReponse[] = this.reponses.map((reponse: Reponse) => {
            return reponse.toJSON();
        });
        return {
            idQuestion: this.idQuestion,
            categorieQuestion: this.categorieQuestion.toJSON(),
            qType: this.qType,
            libelleQuestion: this.libelleQuestion,
            metiers: metiers,
            reponses: reponses
        }
    }
}