import IMetier from "./IMetier";

export default interface Question {
    idQuestion: string;
    type: string;
    libelleQuestion: string;
    metiers: IMetier[];
}