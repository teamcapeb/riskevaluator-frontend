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
    public preconisationsCategorie: PreconisationCategorieQuestion[];

    getMsg() :string {
      return "HEREHREHRE"
    }

    constructor(idCategorie? :  number,
                libelle? : string,
                iQuestionnaire?: IQuestionnaire,
                scoreEvaluations?: IScoreCategory[],
                iQuestions?: IQuestion[],
                iPreconisations?: IPreconisationCategorieQuestion[]
                ){
        this.idCategorie = idCategorie;
        this.libelle = libelle;

        this.questionnaire = iQuestionnaire ? Questionnaire.toQuestionnaire(iQuestionnaire) : null;
        if(scoreEvaluations){
            this.scoreEvaluations = scoreEvaluations.map((iScoreCategory: IScoreCategory) => {
                return ScoreCategory.toScoreCategory(iScoreCategory);
            });
        }
        if(iQuestions){
            this.questions = iQuestions.map((iQuestion: IQuestion) => {
                return Question.toQuestion(iQuestion);
            });
        }
        if(iPreconisations){
            this.preconisationsCategorie = iPreconisations.map((iPreconisation: IPreconisationCategorieQuestion) => {
                return PreconisationCategorieQuestion.toPreconisationCategorieQuestion(iPreconisation);
            });
        }
    }

    static toCategorieQuestion(iCategorie: ICategorieQuestion): CategorieQuestion {
        return new CategorieQuestion(
            iCategorie.idCategorie,
            iCategorie.libelle,
            iCategorie.questionnaire,
            iCategorie.scoreEvaluations,
            iCategorie.questions,
            iCategorie.preconisationsCategorie
        );
    }

    public toJSON(): ICategorieQuestion{
        let iScoreEvaluations: IScoreCategory[] = null;
        let iQuestions: IQuestion[] = null;
        let iPreconisationsCategoriesQuestions: IPreconisationCategorieQuestion[] = null;
        if(this.scoreEvaluations){
            this.scoreEvaluations.map((scoreCategory: ScoreCategory) => {
                return scoreCategory.toJSON();
            });
        }

        if(this.questions){
            iQuestions = this.questions.map((question: Question) => {
                return question.toJSON();
            });
        }

        if(this.preconisationsCategorie){
            iPreconisationsCategoriesQuestions = this.preconisationsCategorie.map((preconisation: PreconisationCategorieQuestion) => {
                return preconisation.toJSON();
            });
        }
        return {
            "idCategorie": this.idCategorie,
            "libelle": this.libelle,
            "questionnaire": this.questionnaire ? this.questionnaire.toJSON() : null,
            "scoreEvaluations": iScoreEvaluations,
            "questions": iQuestions,
            "preconisationsCategorie": iPreconisationsCategoriesQuestions
        }
    }
}
