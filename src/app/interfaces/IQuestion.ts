import IMetier from "./IMetier";

export default interface IQuestion {
    idQuestion: string;
    type: string;
    libelleQuestion: string;
    metiers: IMetier[];
}