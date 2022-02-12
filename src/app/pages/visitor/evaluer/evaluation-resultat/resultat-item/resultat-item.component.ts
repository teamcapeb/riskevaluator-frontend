import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultat-item',
  templateUrl: './resultat-item.component.html',
  styleUrls: ['./resultat-item.component.scss']
})
export class ResultatItemComponent implements OnInit {

  gaugeType = "semi";
  gaugeValue = 28.3;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";
  showMore: Boolean;
  text = `       Votre marge de progression est importante. Vous devez vous rendre compte de l’importance de cette dernière en matière de recrutement. En effet, 83% des recruteurs affirment que la marque employeur a un impact sur l’efficacité du recrutement (LinkedIn, 2013).
                Lisez attentivement les préconisations par catégories afin de mieux cibler vos points forts et vos points faibles à améliorer.
                Nous vous recommandons de prendre rendez-vous avec la CAPEB afin de répondre à vos questions et vous aider dans cette démarche d’amélioration de votre marque employeur.     `;


  constructor() { }

  ngOnInit(): void {
  }

}
