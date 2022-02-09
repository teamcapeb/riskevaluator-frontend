import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import IPreconisationCategorieQuestion from "../interfaces/IPreconisationCategorieQuestion";
import CategorieQuestion from "./CategorieQuestion";
export default class PreconisationCategorieQuestion {

  public idPreconisation: number;
  public idCategorie: number;
  public contenu: string;
  public viewIfPourcentageScoreLessThan: number;
  public categorieQuestion: CategorieQuestion;

  constructor(idPreconisation: number,
              contenu: string,
              viewIfPourcentageScoreLessThan: number,
              idCategorie?: number, 
              iCategorieQuestion?: ICategorieQuestion ){
      this.idPreconisation = idPreconisation;
      this.idCategorie = idCategorie ? idCategorie : null;
      this.contenu = contenu;
      this.viewIfPourcentageScoreLessThan = viewIfPourcentageScoreLessThan;
      this.categorieQuestion = iCategorieQuestion ? CategorieQuestion.toCategorieQuestion(iCategorieQuestion) : null;
  }

  static toPreconisationCategorieQuestion(iPreconisationCategorieQuestion: IPreconisationCategorieQuestion): PreconisationCategorieQuestion {
    return new PreconisationCategorieQuestion(
      iPreconisationCategorieQuestion.idPreconisation,
      iPreconisationCategorieQuestion.contenu,
      iPreconisationCategorieQuestion.viewIfPourcentageScoreLessThan,
      iPreconisationCategorieQuestion.idCategorie,
      iPreconisationCategorieQuestion.categorieQuestion
    );
  }

  public toJSON(): IPreconisationCategorieQuestion{
      return {
        "idPreconisation": this.idPreconisation,
        "idCategorie": this.idCategorie,
        "contenu": this.contenu,
        "viewIfPourcentageScoreLessThan": this.viewIfPourcentageScoreLessThan,
        "categorieQuestion": this.categorieQuestion.toJSON()
      }
  }
}
