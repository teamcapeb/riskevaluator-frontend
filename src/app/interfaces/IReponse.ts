import IQuestion from "./IQuestion";

export default interface IReponse {
  idReponse: number;
  question?: IQuestion;
  nbPoints: number;
  contenu: string;
  isChecked?: boolean;

}
