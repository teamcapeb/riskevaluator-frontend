export default interface ICompte {
    idCompte: number;
    noEntreprise: number;
    isAdmin: boolean;
    mail: string;
    pwd: string;
    name: string;
    firstName: string;
    isValid: boolean;
    creationDate: Date;
    lastLogin: Date;
    isCgu: boolean;
    isForgotpass: boolean;
    isTempPassword: string;
} 