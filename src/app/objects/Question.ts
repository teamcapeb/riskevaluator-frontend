import IMetier from "@/interfaces/IMetier";
import IQuestion from "@/interfaces/IQuestion";
import Metier from './Metier';
import Reponse from './Reponse';
import IReponse from '../interfaces/IReponse';

export default class Question {
    idQuestion: string;
    type: string;
    libelleQuestion: string;
    metiers: Metier[];
    reponses: Reponse[];

    constructor(idQuestion: string, type: string, libelleQuestion: string, metiers: Metier[], reponses: Reponse[]){
        this.idQuestion = idQuestion;
        this.type = type;
        this.libelleQuestion = libelleQuestion;
        this.metiers = metiers;
        this.reponses = reponses;
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
            type: this.type,
            libelleQuestion: this.libelleQuestion,
            metiers: metiers,
            reponses: this.reponses
        }
    }
}