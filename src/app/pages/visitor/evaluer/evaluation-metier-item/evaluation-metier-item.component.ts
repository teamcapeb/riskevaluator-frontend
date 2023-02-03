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
  imageMetier: string = "";

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
        return this.imageMetier = "../../../../../assets/img/metiers/macon.png";
      case "Serrurier / métallier":
        return this.imageMetier = "../../../../../assets/img/metiers/serrurier-metallier.png";
      case "Electricien":
        return this.imageMetier = "../../../../../assets/img/metiers/electricien.png";
      case "Couvreur Zingueur":
        return this.imageMetier = "../../../../../assets/img/metiers/couvreur-zingueur.png";
      case "Chauffagiste":
        return this.imageMetier = "../../../../../assets/img/metiers/chauffagiste.png";
      case "Peintre en bâtiment":
        return this.imageMetier = "../../../../../assets/img/metiers/peintre-en-batiment.png";
      case "Tailleur de pierre":
        return this.imageMetier = "../../../../../assets/img/metiers/tailleur-de-pierre.png";
      case "Menuisier":
        return this.imageMetier = "../../../../../assets/img/metiers/charpentier-menuisier.png";
      case "Charpentier":
        return this.imageMetier = "../../../../../assets/img/metiers/charpentier-menuisier.png";
      case "Plombier":
        return this.imageMetier = "../../../../../assets/img/metiers/plombier.png";
      case "Plaquiste / Plâtrier":
        return this.imageMetier = "../../../../../assets/img/metiers/plaquiste.png";
      case "Carreleur":
        return this.imageMetier = "../../../../../assets/img/metiers/carreleur.png";
      default:
        return "";
    }
  }
}
