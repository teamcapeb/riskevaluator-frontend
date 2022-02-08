import ICategorieQuestion from '@/interfaces/ICategorieQuestion';
import IPreconisationGlobale from '@/interfaces/IPreconisationGlobale';
import IQuestionnaire from '../interfaces/IQuestionnaire';
import CategorieQuestion from './CategorieQuestion';
import PreconisationGlobale from './PreconisationGlobale';

export default class Questionnaire {
    idQuestionnaire: number;
    thematique: string;
    preconisationGlobales: PreconisationGlobale[];
    categorieQuestions: CategorieQuestion[];
    
    
    constructor(
        idQuestionnaire: number,
        thematique: string,
        preconisationGlobales: IPreconisationGlobale[],
        categorieQuestions: ICategorieQuestion[]
        ){
            this.idQuestionnaire = idQuestionnaire;
            this.thematique = thematique;
            this.preconisationGlobales= preconisationGlobales.map((iPreconisationsGlobales: IPreconisationGlobale) => {
                return PreconisationGlobale.toPreconisationGlobale(iPreconisationsGlobales);
            });
            this.categorieQuestions= categorieQuestions.map((iCategorieQuestion: ICategorieQuestion) => {
                return CategorieQuestion.toCategorieQuestion(iCategorieQuestion);
            });;
        }
        
    static toQuestionnaire(iQuestionnaire: IQuestionnaire): Questionnaire {
        return new Questionnaire(
            iQuestionnaire.idQuestionnaire,
            iQuestionnaire.thematique,
            iQuestionnaire.preconisationGlobales,
            iQuestionnaire.categorieQuestions
        );
    }

    public toJSON(): IQuestionnaire{
        let iPreconisationGlobale: IPreconisationGlobale[] = this.preconisationGlobales.map((preconisationGlobale: PreconisationGlobale) => {
            return preconisationGlobale.toJSON();
        });
        let iCategorieQuestion: ICategorieQuestion[] = this.categorieQuestions.map((categorieQuestion: CategorieQuestion) => {
            return categorieQuestion.toJSON();
        });
        return {
            "idQuestionnaire": this.idQuestionnaire,
            "thematique": this.thematique,
            "preconisationGlobales": iPreconisationGlobale,
            "categorieQuestions": iCategorieQuestion
        }
    }
}