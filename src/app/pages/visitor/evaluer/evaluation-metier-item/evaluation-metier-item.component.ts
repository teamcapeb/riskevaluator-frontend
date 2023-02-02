import {IMetier} from "@/interfaces/IMetier";
import { Component, Input, OnInit } from "@angular/core";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-evaluation-metier-item',
  templateUrl: './evaluation-metier-item.component.html',
  styleUrls: ['./evaluation-metier-item.component.scss']
})
export class EvaluationMetierItemComponent implements OnInit {
  @Input() metier$ : IMetier = null;
  imageMetier: string = "../../../../../assets/img/metiers/";

  onSelectCard() {
    this.metier$.isChecked = !this.metier$.isChecked;
  }
  constructor() { }

  ngOnInit(): void {
    this.metier$.isChecked =false;
  }

  getImg(nomMetier: string): string {
    switch(nomMetier) {
      case "Maçon":
        return this.imageMetier += "macon.png";
      case "Serrieur / métallier":
        return this.imageMetier += "serrurier-metallier.png";
      case "Electricien":
        return this.imageMetier += "electricien.png";
      case "Couvreur Zingueur":
        return this.imageMetier += "couvreur-zingueur.png";
      case "Chauffagiste":
        return this.imageMetier += "chauffagiste.png";
      case "Peintre en bâtiment":
        return this.imageMetier += "peintre-en-batiment.png";
      case "Tailleur de pierre":
        return this.imageMetier += "tailleur-de-pierre.png";
      case "Menuisier":
        return this.imageMetier += "charpentier-menuisier.png";
      case "Charpentier":
        return this.imageMetier += "charpentier-menuisier.png";
      case "Plombier":
        return this.imageMetier += "plombier.png";
      case "Plaquiste / Plâtrier":
        return this.imageMetier += "plaquiste.png";
      case "Carreleur":
        return this.imageMetier += "carreleur.png";
      default:
        return "";
    }
  }
}
