import IQuestionnaire from './IQuestionnaire';
export default interface IPreconisationGlobale {
    idPreconisationG: number;
    questionnaire: IQuestionnaire;
    contenue: string;
    viewIfPourcentageScoreLessThan: number;
}
