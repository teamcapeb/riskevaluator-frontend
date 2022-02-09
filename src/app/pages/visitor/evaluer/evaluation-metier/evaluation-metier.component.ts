import IMetier from '@/interfaces/IMetier';
import Metier from '@/objects/Metier';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-evaluation-metier',
  templateUrl: './evaluation-metier.component.html',
  styleUrls: ['./evaluation-metier.component.scss']
})
export class EvaluationMetierComponent implements OnInit {
  private baseUrl: string = environment.apiUrl + '/Metiers';
  private _metiers : Observable<Metier[]>;
  @ViewChild('input') input : any;

  constructor(    private http: HttpClient,
                  private route: ActivatedRoute,
                  private router: Router) { }

  ngOnInit(): void {
  }


}
