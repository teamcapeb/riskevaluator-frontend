import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Metier from '../../../interfaces/Metier';
import { MetierService } from '../../../services/serviceMetier/metier.service';
import $ from 'jquery';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-gestion-metiers',
  templateUrl: './gestion-metiers.component.html',
  styleUrls: ['./gestion-metiers.component.scss']
})
export class GestionMetiersComponent implements OnInit {

  private _metiers: Observable<Metier[]>;
  actualMetier: Metier;

  constructor(private metierService: MetierService) { }

  ngOnInit(): void {
    this._metiers = this.metierService.getAll();
  }

  ngAfterViewInit(){

  }

  addMetierClick(event:any): void{
    $('#formMetier').modal('toggle');
  }

  openMetierForm(){

  }

  get metiers(): Observable<Metier[]> {
    return this._metiers;
  }

}
