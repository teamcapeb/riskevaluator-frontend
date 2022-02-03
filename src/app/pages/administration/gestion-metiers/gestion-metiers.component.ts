import Metier from '@/objects/Metier';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MetierService } from '../../../services/serviceMetier/metier.service';
import IMetier from '../../../interfaces/IMetier';
import { takeUntil } from 'rxjs/operators';
import IListEvent from '@/interfaces/IListEvent';

@Component({
  selector: 'app-gestion-metiers',
  templateUrl: './gestion-metiers.component.html',
  styleUrls: ['./gestion-metiers.component.scss']
})
export class GestionMetiersComponent implements OnInit {

  private _metiers: Observable<Metier[]>;
  @ViewChild('metierForm') metierForm: any;
  actualMetier: Metier;

  constructor(private metierService: MetierService) { }

  ngOnInit(): void {
    this._metiers = this.metierService.getAll();
  }

  ngAfterViewInit(){

  }

  add(): void{
    this.actualMetier = new Metier('', '');
    this.metierForm.open('add');
  }

  update(event: IListEvent){
    this.actualMetier = event.data;
    this.metierForm.open('update');
  }

  delete(event: IListEvent){
    this.actualMetier = event.data;
    this.metierForm.open('delete');
  }

  createOrUpdateOrDeleteMetier(event: IListEvent){
    this._metiers = null;
    let finalise = new Subject();
    let obs = null;
    if(event.action === 'update'){
      obs = this.metierService.update(event.data);
    }else if (event.action === 'add'){
      obs = this.metierService.create(event.data);
    }else if(event.action === 'delete'){
      obs = this.metierService.delete(event.data);
    }
    obs.pipe(takeUntil(finalise)).subscribe(() =>{
      this._metiers = this.metierService.getAll();
      finalise.next();
      finalise.complete();
    });
  }

  get metiers(): Observable<Metier[]> {
    return this._metiers;
  }

}
