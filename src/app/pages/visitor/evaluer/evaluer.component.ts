import IMetier from '@/interfaces/IMetier';
import Metier from '@/objects/Metier';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MetierService } from '@services/serviceMetier/metier.service';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  private baseUrl: string = environment.apiUrl + '/Metiers';
  private _metiers : Observable<Metier[]>;
  @ViewChild('input') input : any;
  private idMetierChecked: number[] = [];
  private metierExtras: NavigationExtras = {
    state: {
      metierList : [],
      idQuestionnaire : ''
    }
  };

  constructor(    private http: HttpClient,
                  private route: ActivatedRoute,
                  private router: Router,
                  private metierService :MetierService) {}

  ngOnInit(): void {
    this._metiers = this.getAll();
   // this.route.params.subscribe(params => this.metierIdQuestionnaireExtras.state['idQuestionnaire']  = params['id']);
    this.metierExtras.state['metierList'] = this.idMetierChecked;
    // a enlever
    //this.metierExtras.state['idQuestionnaire'] = "4";
  }

  getAll(): Observable<Metier[]>{
    let finalise = new Subject();
    let obs = this.metierService.getAll();
    obs.pipe(takeUntil(finalise)).subscribe((data) =>{
        finalise.complete();
      },
      (err) => {
        this.errorModal.open(JSON.stringify(err.error));
        finalise.complete();
      });
    return obs;
  }




  myFunction() : void {
    this.router.navigate(['evaluer/evaluation-thematique'], this.metierExtras);

  }


  check(event : any, metier : Metier) : void {

    var rep = [];
    if (event.checked === true) {
      this.idMetierChecked.push(metier.idMetier);
    }

    if (event.checked === false) {
      var index: number = this.idMetierChecked.indexOf(metier.idMetier);
      this.idMetierChecked.splice(index, 1);
    }
  }

  get metiers(): Observable<Metier[]> {
    return this._metiers;
  }

}
