import IMetier from "@/interfaces/IMetier";
import IQuestion from "@/interfaces/IQuestion";
import Metier from './Metier';

export default class Question {
    idQuestion: string;
    type: string;
    libelleQuestion: string;
    metiers: Metier[];

    constructor(idQuestion: string, type: string, libelleQuestion: string, metiers: Metier[]){
        this.idQuestion = idQuestion;
        this.type = type;
        this.libelleQuestion = libelleQuestion;
        this.metiers = metiers;
    }


    public toJSON(): IQuestion{
        let metiers: IMetier[] = this.metiers.map((metier: Metier) => {
            return metier.toJSON();
        });
        return {
            idQuestion: this.idQuestion,
            type: this.type,
            libelleQuestion: this.libelleQuestion,
            metiers: metiers
        }
    }
}