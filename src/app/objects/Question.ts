import IMetier from "@/interfaces/IMetier";
import IQuestion from "@/interfaces/IQuestion";
import Metier from './Metier';
import Reponse from './Reponse';
import IReponse from '../interfaces/IReponse';
import CategorieQuestion from "./CategorieQuestion";
import ICategorieQuestion from '../interfaces/ICategorieQuestion';

export default class Question {
    idQuestion: number;
    scoreMaxPossibleQuestion: number;
    categorieQuestion: CategorieQuestion
    typeQuestion: string;
    libelleQuestion: string;
    metiers: Metier[];
    reponses: Reponse[];

    constructor(idQuestion: number, scoreMaxPossibleQuestion: number ,typeQuestion: string, libelleQuestion: string, iCategorieQuestion?: ICategorieQuestion, metiers?: IMetier[], reponses?: IReponse[]){
        this.idQuestion = idQuestion;
        this.scoreMaxPossibleQuestion = scoreMaxPossibleQuestion;
        this.typeQuestion = typeQuestion;
        this.libelleQuestion = libelleQuestion;
        this.categorieQuestion = iCategorieQuestion ? CategorieQuestion.toCategorieQuestion(iCategorieQuestion) : null;
        this.reponses = [];
        this.metiers = [];
        if(metiers){
            this.metiers = metiers.map((iMetier: IMetier) => {
                return Metier.toMetier(iMetier);
            });
        }
        if(reponses){
            this.reponses = reponses.map((iReponse: IReponse) => {
                return Reponse.toReponse(iReponse);
            });
        }
    }

    public static toQuestion(iQuestion: IQuestion): Question{
        return new Question(
            iQuestion.idQuestion,
            iQuestion.scoreMaxPossibleQuestion,
            iQuestion.typeQuestion,
            iQuestion.libelleQuestion,
            iQuestion.categorieQuestion,
            iQuestion.metiers,
            iQuestion.reponses
        );
    }

    public toJSON(): IQuestion{
        let metiers: IMetier[] = null;
        let reponses: IReponse[] = null;
        if(this.metiers) {
            metiers = this.metiers.map((metier: Metier) => {
                console.log(metier as Metier)
                return metier.toJSON();
            });
        }
        if(this.reponses) {
            reponses = this.reponses.map((reponse: Reponse) => {
                return reponse.toJSON();
            });
        }
        return {
            idQuestion: this.idQuestion,
            scoreMaxPossibleQuestion: this.scoreMaxPossibleQuestion,
            categorieQuestion: this.categorieQuestion ? this.categorieQuestion.toJSON() : null,
            typeQuestion: this.typeQuestion,
            libelleQuestion: this.libelleQuestion,
            metiers: metiers,
            reponses: reponses
        }
    }
}
