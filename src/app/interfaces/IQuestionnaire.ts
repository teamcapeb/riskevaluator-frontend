import ICategorieQuestion from "./ICategorieQuestion";
import IPreconisationGlobale from "./IPreconisationGlobale";

export default interface IQuestionnaire {
    idQuestionnaire: number;
    thematique: string;
    preconisationGlobales?: IPreconisationGlobale[];
    categorieQuestions?: ICategorieQuestion[];
}
