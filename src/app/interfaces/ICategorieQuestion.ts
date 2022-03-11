import IPreconisationCategorieQuestion from './IPreconisationCategorieQuestion';
import IQuestion from './IQuestion';
import IQuestionnaire from './IQuestionnaire';
import IScoreCategory from './IScoreCategory';
export default interface ICategorieQuestion {
    idCategorie?: number;
    libelle?: string;
    questionnaire?: IQuestionnaire;
    scoreEvaluations?: IScoreCategory[];
    questions?: IQuestion[];
    preconisationsCategorie?: IPreconisationCategorieQuestion[];
    isChecked?: boolean;
}
