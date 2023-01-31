import IQuestion from './IQuestion';

export interface IMetier {
    idMetier: number;
    nomMetier: string;
    questions: IQuestion[];
    image?: string;
    isChecked?: boolean;
}
