import IQuestion from './IQuestion';
export default interface IMetier {
    idMetier: number;
    nomMetier: string;
    questions: IQuestion[];
    isChecked? : boolean
}
