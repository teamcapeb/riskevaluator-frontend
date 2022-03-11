import IQuestionnaire from './IQuestionnaire';
export default interface IPreconisationGlobale {
    idPreconisationG: number;
    questionnaire?: IQuestionnaire;
    contenu: string;
    viewIfPourcentageScoreLessThan: number;
    pourcentage?: number;

}
