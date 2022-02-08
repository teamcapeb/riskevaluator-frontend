import IMetier from '../interfaces/IMetier';
export default class Metier {
    public idMetier: string;
    public nomMetier: string;

    constructor(idMetier: string, nomMetier: string){
        this.idMetier = idMetier;
        this.nomMetier = nomMetier;
    }

    public toJSON(): IMetier{
        return {
            "idMetier": this.idMetier,
            "nomMetier": this.nomMetier
        }
    }
}