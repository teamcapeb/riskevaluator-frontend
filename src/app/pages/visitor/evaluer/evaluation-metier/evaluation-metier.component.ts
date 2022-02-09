import IMetier from '@/interfaces/IMetier';
import Metier from '@/objects/Metier';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetierService } from '@services/serviceMetier/metier.service';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-evaluation-metier',
  templateUrl: './evaluation-metier.component.html',
  styleUrls: ['./evaluation-metier.component.scss']
})
export class EvaluationMetierComponent implements OnInit {
  @ViewChild('errorModal') errorModal: any;
  private baseUrl: string = environment.apiUrl + '/Metiers';
  private _metiers : Observable<Metier[]>;
  @ViewChild('input') input : any;

  constructor(    private http: HttpClient,
                  private route: ActivatedRoute,
                  private router: Router,
                  private metierService :MetierService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => console.log(params['id']));
    this._metiers = this.getAll();
  }

  getAll(): Observable<Metier[]>{
    let finalise = new Subject();
    let obs = this.metierService.getAll();
    obs.pipe(takeUntil(finalise)).subscribe((data) =>{
        finalise.next();
        finalise.complete();
      },
      (err) => {
        this.errorModal.open(JSON.stringify(err.error));
        finalise.next();
        finalise.complete();
      });
    return obs;
  }

  get metiers(): Observable<Metier[]> {
    return this._metiers;
  }

}
