import IPreconisationGlobale from "@/interfaces/IPreconisationGlobale";
export default class PreconisationGlobale {

  public idPreconisationGlobale: string;
  public viewIfPourcentageScoreLessThan: number;
  public Contenue: string;

  constructor(idPreconisationGlobale: string, viewIfPourcentageScoreLessThan: number, Contenue: string ){
      this.idPreconisationGlobale =idPreconisationGlobale;
      this.viewIfPourcentageScoreLessThan = viewIfPourcentageScoreLessThan;
      this.Contenue = Contenue;
  }

  public toJSON(): IPreconisationGlobale{
      return {
        "idPreconisationGlobale": this.idPreconisationGlobale,
        "viewIfPourcentageScoreLessThan": this.viewIfPourcentageScoreLessThan,
        "Contenue": this.Contenue
      }
  }
}
