import ICategorieQuestion from "./ICategorieQuestion";
import IPreconisationGlobale from "./IPreconisationGlobale";

export default interface IQuestionnaire {
    idQuestionnaire: string;
    thematique: string;
    preconisationsGlobales: IPreconisationGlobale [];
    categoriesQuestions: ICategorieQuestion[];
}