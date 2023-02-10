import {IMetier} from "@/interfaces/IMetier";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-evaluation-metier-item',
  templateUrl: './evaluation-metier-item.component.html',
  styleUrls: ['./evaluation-metier-item.component.scss']
})
export class EvaluationMetierItemComponent implements OnInit {
  @Input() metier$ : IMetier = null;
  @Input() listeMetiers : IMetier[] = [];
  @Output() newItemEvent = new EventEmitter<boolean>();
  imageMetier: string = "";
  isOneCheck : boolean = true;

  onSelectCard() {
    this.metier$.isChecked = !this.metier$.isChecked;
    this.isOneCheck = this.listeMetiers.some(item => item.isChecked === true);
    this.addNewItem(this.isOneCheck);
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
        return this.imageMetier = "../../../../../assets/img/metier.png"
    }
  }

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }
}
