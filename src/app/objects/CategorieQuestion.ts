import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IPreconisationCategorieQuestion from "@/interfaces/IPreconisationCategorieQuestion";
import IQuestion from "@/interfaces/IQuestion";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import PreconisationCategorieQuestion from "./PreconisationCategorieQuestion";
import Question from "./Question";
import Questionnaire from "./Questionnaire";
import ScoreCategory from './ScoreCategory';
import IScoreCategory from '../interfaces/IScoreCategory';


export default class CategorieQuestion {
    public idCategorie: number;
    public libelle: string;
    public questionnaire: Questionnaire;
    public scoreEvaluations: ScoreCategory[];
    public questions: Question[];
    public preconisations: PreconisationCategorieQuestion[];

    constructor(idCategorie: number, 
                libelle: string,
                iQuestionnaire: IQuestionnaire,
                scoreEvaluations: IScoreCategory[],
                iQuestions: IQuestion[],
                iPreconisations: IPreconisationCategorieQuestion[]
                ){
        this.idCategorie = idCategorie;
        this.libelle = libelle;
        this.questionnaire = Questionnaire.toQuestionnaire(iQuestionnaire);
        this.scoreEvaluations = scoreEvaluations.map((iScoreCategory: IScoreCategory) => {
            return ScoreCategory.toScoreCategory(iScoreCategory);
        });
        this.questions = iQuestions.map((iQuestion: IQuestion) => {
            return Question.toQuestion(iQuestion);
        });
        this.preconisations = iPreconisations.map((iPreconisation: IPreconisationCategorieQuestion) => {
            return PreconisationCategorieQuestion.toPreconisationCategorieQuestion(iPreconisation);
        });
    }

    static toCategorieQuestion(iCategorie: ICategorieQuestion): CategorieQuestion {
        return new CategorieQuestion(
            iCategorie.idCategorie,
            iCategorie.libelle,
            iCategorie.questionnaire,
            iCategorie.scoreEvaluations,
            iCategorie.questions,
            iCategorie.preconisations
        );
    }
    
    public toJSON(): ICategorieQuestion{
        let iScoreEvaluations: IScoreCategory[] = this.scoreEvaluations.map((scoreCategory: ScoreCategory) => {
            return scoreCategory.toJSON();
        });
        let iQuestions: IQuestion[] = this.questions.map((question: Question) => {
            return question.toJSON();
        });
        let iPreconisationsCategoriesQuestions: IPreconisationCategorieQuestion[] = this.preconisations.map((preconisation: PreconisationCategorieQuestion) => {
            return preconisation.toJSON();
        });
        return {
            "idCategorie": this.idCategorie,
            "libelle": this.libelle,
            "questionnaire": this.questionnaire.toJSON(),
            "scoreEvaluations": iScoreEvaluations,
            "questions": iQuestions,
            "preconisations": iPreconisationsCategoriesQuestions
        }
    }
}
