import ICategorieQuestion from '@/interfaces/ICategorieQuestion';
import IPreconisationGlobale from '@/interfaces/IPreconisationGlobale';
import IQuestionnaire from '../interfaces/IQuestionnaire';

export default class Questionnaire {
    idQuestionnaire: string;
    thematique: string;
    preconisationsGlobales: IPreconisationGlobale [];
    categoriesQuestions: ICategorieQuestion[];
    

    constructor(
        idQuestionnaire: string,
        thematique: string,
        preconisationsGlobales: IPreconisationGlobale [],
        categoriesQuestions: ICategorieQuestion[],
        
    ){
        this.idQuestionnaire = idQuestionnaire;
        this.thematique = thematique;
        this.preconisationsGlobales= preconisationsGlobales;
        this.categoriesQuestions= categoriesQuestions;
        
    }

    public toJSON(): IQuestionnaire{
        return {
            idQuestionnaire: this.idQuestionnaire,
            thematique: this.thematique,
            categoriesQuestions: this.categoriesQuestions,
            preconisationsGlobales: this.preconisationsGlobales

        }
    }
}