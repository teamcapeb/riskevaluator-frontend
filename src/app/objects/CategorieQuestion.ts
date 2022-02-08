import IPreconisationCategorieQuestion from "@/interfaces/IPreconisationCategorieQuestion";
import IQuestion from "@/interfaces/IQuestion";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import PreconisationCategorieQuestion from "./PreconisationCategorieQuestion";
import Question from "./Question";
import Questionnaire from "./Questionnaire";


export default class CategorieQuestion {
    public idCategorie: number;
    public libelle: string;
    public questionnaire: Questionnaire;
    public scoreEvaluations: number[];
    public questions: Question[];
    public preconisations: PreconisationCategorieQuestion;

    constructor(idCategorie: number, 
                libelle: string,
                questionnaire: IQuestionnaire,
                scoreEvaluations: number[],
                questions: IQuestion[],
                preconisations: IPreconisationCategorieQuestion
                ){
        this.idCategorie = idCategorie;
        this.libelle = libelle;
        this.questionnaire = questionnaire;
        this.scoreEvaluations = scoreEvaluations;
        this.questions = questions;
        this.preconisations = preconisations;
    }

    public toJSON(): ICategorieQuestion{
        return {
            "idCategorie": this.idCategoriesQuestion,
            "libelle": this.libelle,
            "questionnaire": IQuestionnaire,
            "scoreEvaluations": number[],
            "questions": IQuestion[],
            "preconisations": IPreconisationCategorieQuestion
        }
    }
}
