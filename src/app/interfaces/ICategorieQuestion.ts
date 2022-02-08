import IPreconisationCategorieQuestion from './IPreconisationCategorieQuestion';
import IQuestion from './IQuestion';
import IQuestionnaire from './IQuestionnaire';
export default interface ICategorieQuestion {
    idCategorie: number;
    libelle: string;
    questionnaire: IQuestionnaire;
    scoreEvaluations: number[];
    questions: IQuestion[]
    preconisations: IPreconisationCategorieQuestion
}
