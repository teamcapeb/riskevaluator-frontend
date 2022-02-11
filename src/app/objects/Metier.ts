import IQuestion from '@/interfaces/IQuestion';
import IMetier from '../interfaces/IMetier';
import Question from './Question';
export default class Metier {
    public idMetier: number;
    public nomMetier: string;
    questions: Question[];

    constructor(idMetier: number, nomMetier: string, questions: IQuestion[]){
        this.idMetier = idMetier;
        this.nomMetier = nomMetier;
        this.questions = questions.map((iQuestion: IQuestion) => {
            return Question.toQuestion(iQuestion);
        });
    }

    static toMetier(iMetier: IMetier) {
        return new Metier(
            iMetier.idMetier,
            iMetier.nomMetier,
            iMetier.questions
        );
    }

    public toJSON(): IMetier{
        let iQuestions = this.questions.map((question: Question) => {
            return question.toJSON();
        });
        return {
            "idMetier": this.idMetier,
            "nomMetier": this.nomMetier,
            "questions": iQuestions
        }
    }
}