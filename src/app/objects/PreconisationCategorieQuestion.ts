import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IPreconisationCategorieQuestion from "../interfaces/IPreconisationCategorieQuestion";
import CategorieQuestion from "./CategorieQuestion";
export default class PreconisationCategorieQuestion {

  public idPreconisation: number;
  public contenu: string;
  public viewIfPourcentageScoreLessThan: number;
  public categorieQuestion: CategorieQuestion;

  constructor(idPreconisation: number,
              contenu: string,
              viewIfPourcentageScoreLessThan: number,
              iCategorieQuestion?: ICategorieQuestion ){
      this.idPreconisation = idPreconisation;
      this.contenu = contenu;
      this.viewIfPourcentageScoreLessThan = viewIfPourcentageScoreLessThan;
      this.categorieQuestion = iCategorieQuestion ? CategorieQuestion.toCategorieQuestion(iCategorieQuestion) : null;
  }

  static toPreconisationCategorieQuestion(iPreconisationCategorieQuestion: IPreconisationCategorieQuestion): PreconisationCategorieQuestion {
    return new PreconisationCategorieQuestion(
      iPreconisationCategorieQuestion.idPreconisation,
      iPreconisationCategorieQuestion.contenu,
      iPreconisationCategorieQuestion.viewIfPourcentageScoreLessThan,
      iPreconisationCategorieQuestion.categorieQuestion
    );
  }

  public toJSON(): IPreconisationCategorieQuestion{
      return {
        "idPreconisation": this.idPreconisation,
        "contenu": this.contenu,
        "viewIfPourcentageScoreLessThan": this.viewIfPourcentageScoreLessThan,
        "categorieQuestion": this.categorieQuestion ? this.categorieQuestion.toJSON(): null
      }
  }
}
