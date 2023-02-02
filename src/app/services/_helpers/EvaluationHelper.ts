import {IMetier} from "@/interfaces/IMetier";

export abstract class EvaluationHelper {

  static  joinMetiers(listMetier : number[]) : string {
    let joindMetiers:string = "?metierId=" + listMetier.join("&metierId=");
    return joindMetiers
  }
}
