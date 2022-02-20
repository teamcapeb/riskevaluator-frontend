import Metier from '@/objects/Metier';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MetierService } from '../../../services/serviceMetier/metier.service';
import { takeUntil } from 'rxjs/operators';
import IListEvent from '@/interfaces/IListEvent';
import { ModalService } from "@services/serviceModal/modal.service";

@Component({
  selector: 'app-gestion-metiers',
  templateUrl: './gestion-metiers.component.html',
  styleUrls: ['./gestion-metiers.component.scss']
})
export class GestionMetiersComponent implements OnInit {

  private _metiers: Observable<Metier[]>;

  @ViewChild('metierForm') metierForm: any;
  @ViewChild('errorModal') errorModal: any;

  public actualMetier: Metier;

  constructor(private metierService: MetierService,
              private modalService: ModalService
            ) { }

  ngOnInit(): void {
    this._metiers = this.metierService.getAll();

  }

  add(): void{
    this.actualMetier = new Metier(0, '', []);
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

  public async createOrUpdateOrDeleteMetier(event: IListEvent){
    this._metiers = null;
    let res = null;
    try{
      if(event.action === 'update'){
        res = await this.metierService.update(event.data);
      }else if (event.action === 'add'){
        res = await this.metierService.create(event.data);
      }else if(event.action === 'delete'){
        res = await this.metierService.delete(event.data);
      }
    }catch(error){
      if( error.status === 409 ){
        this.modalService.error('Ce metier existe déjà !');
      }
    }
    this._metiers = this.metierService.getAll();
  }

  get metiers(): Observable<Metier[]> {
    return this._metiers;
  }

}
