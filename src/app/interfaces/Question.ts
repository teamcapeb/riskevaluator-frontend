import Metier from "./Metier";

export default interface Question {
    idQuestion: string;
    type: string;
    libelleQuestion: string;
    metiers: Metier[];
}