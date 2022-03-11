import ICategorieQuestion from './ICategorieQuestion';
export default interface IPreconisationCategorieQuestion {
    idPreconisation: number;
    contenu: string;
    viewIfPourcentageScoreLessThan: number;
    categorieQuestion?: ICategorieQuestion;
}
