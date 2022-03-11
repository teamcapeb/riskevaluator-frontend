import IPreconisationGlobale from "@/interfaces/IPreconisationGlobale";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import Questionnaire from "./Questionnaire";
export default class PreconisationGlobale {
  
  public idPreconisationG: number;
  public questionnaire: Questionnaire;
  public contenu: string;
  public viewIfPourcentageScoreLessThan: number;
  
  constructor(idPreconisationG: number,
              contenu: string,
              viewIfPourcentageScoreLessThan: number,
              iQuestionnaire?: IQuestionnaire){
    this.idPreconisationG = idPreconisationG;
    this.questionnaire = iQuestionnaire ? Questionnaire.toQuestionnaire(iQuestionnaire) : null;
    this.contenu = contenu;
    this.viewIfPourcentageScoreLessThan = viewIfPourcentageScoreLessThan;
  }
  
  static toPreconisationGlobale(iPreconisationsGlobales: IPreconisationGlobale): PreconisationGlobale  {
      return new PreconisationGlobale(
        iPreconisationsGlobales.idPreconisationG,
        iPreconisationsGlobales.contenu,
        iPreconisationsGlobales.viewIfPourcentageScoreLessThan,
        iPreconisationsGlobales.questionnaire
      );
  }

  public toJSON(): IPreconisationGlobale{
      return {
        "idPreconisationG": this.idPreconisationG,
        "questionnaire": this.questionnaire ? this.questionnaire.toJSON() : null,
        "contenu": this.contenu,
        "viewIfPourcentageScoreLessThan": this.viewIfPourcentageScoreLessThan
      }
  }
}
