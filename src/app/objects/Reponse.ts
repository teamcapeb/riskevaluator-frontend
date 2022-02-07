import IReponse from '../interfaces/IReponse';
export default class Reponse {
    idReponse: string;
    nbPoints: number;
    contenu: string;

    constructor(
        idReponse: string,
        nbPoints: number,
        contenu: string
    ){
        this.idReponse = idReponse;
        this.nbPoints = nbPoints;
        this.contenu = contenu;
    }

    public toJSON(): IReponse{
        return {
            idReponse: this.idReponse,
            nbPoints: this.nbPoints,
            contenu: this.contenu
        }
    }
}