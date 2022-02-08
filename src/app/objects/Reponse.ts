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
        this.question = Question.toQuestion(question);
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
            question: this.question.toJSON(),
            nbPoints: this.nbPoints,
            contenu: this.contenu
        }
    }
}