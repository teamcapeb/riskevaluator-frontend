import IPreconisationGlobale from "@/interfaces/IPreconisationGlobale";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import Questionnaire from "./Questionnaire";
export default class PreconisationGlobale {
  
  public idPreconisationG: number;
  public questionnaire: Questionnaire;
  public contenu: string;
  public viewIfPourcentageScoreLessThan: number;
  
  constructor(idPreconisationG: number, 
              iQuestionnaire: IQuestionnaire,
              contenu: string,
              viewIfPourcentageScoreLessThan: number){
    this.idPreconisationG = idPreconisationG;
    this.questionnaire = Questionnaire.toQuestionnaire(iQuestionnaire);
    this.contenu = contenu;
    this.viewIfPourcentageScoreLessThan = viewIfPourcentageScoreLessThan;
  }
  
  static toPreconisationGlobale(iPreconisationsGlobales: IPreconisationGlobale): PreconisationGlobale  {
      return new PreconisationGlobale(
        iPreconisationsGlobales.idPreconisationG,
        iPreconisationsGlobales.questionnaire,
        iPreconisationsGlobales.contenu,
        iPreconisationsGlobales.viewIfPourcentageScoreLessThan
      );
  }

  public toJSON(): IPreconisationGlobale{
      return {
        "idPreconisationG": this.idPreconisationG,
        "questionnaire": this.questionnaire.toJSON(),
        "contenu": this.contenu,
        "viewIfPourcentageScoreLessThan": this.viewIfPourcentageScoreLessThan
      }
  }
}
