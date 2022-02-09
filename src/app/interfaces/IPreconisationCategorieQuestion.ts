import ICategorieQuestion from './ICategorieQuestion';
export default interface IPreconisationCategorieQuestion {
    idPreconisation: number;
    idCategorie?: number;
    contenu: string;
    viewIfPourcentageScoreLessThan: number;
    categorieQuestion?: ICategorieQuestion;
}
