import IQuestion from '@/interfaces/IQuestion';
import IReponse from '../interfaces/IReponse';
import Question from './Question';
export default class Reponse {
    idReponse: number;
    question: Question;
    nbPoints: number;
    contenu: string;

    constructor(
        idReponse: number,
        question: IQuestion,
        nbPoints: number,
        contenu: string
    ){
        this.idReponse = idReponse;
        this.question = question ? Question.toQuestion(question) : null;
        this.nbPoints = nbPoints;
        this.contenu = contenu;
    }

    static toReponse(iReponse: IReponse): Reponse {
        return new Reponse(
            iReponse.idReponse,
            iReponse.question,
            iReponse.nbPoints,
            iReponse.contenu
        );
    }

    public toJSON(): IReponse{
        return {
            idReponse: this.idReponse,
            question: this.question ? this.question.toJSON() : null,
            nbPoints: this.nbPoints,
            contenu: this.contenu
        }
    }
}