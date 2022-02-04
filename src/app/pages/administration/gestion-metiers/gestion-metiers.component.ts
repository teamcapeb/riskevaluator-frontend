import Metier from '@/objects/Metier';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MetierService } from '../../../services/serviceMetier/metier.service';
import { takeUntil } from 'rxjs/operators';
import IListEvent from '@/interfaces/IListEvent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '@components/error-modal/error-modal.component';

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
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    let finalise = new Subject();
    this._metiers = this.getAll();
  }

  getAll(): Observable<Metier[]>{
    let finalise = new Subject();
    let obs = this.metierService.getAll();
    obs.pipe(takeUntil(finalise)).subscribe(() =>{
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
    obs.pipe(takeUntil(finalise)).subscribe((res) =>{
      this._metiers = this.metierService.getAll();
      finalise.next();
      finalise.complete();
    },
    (err) => {
      this.errorModal.open(JSON.stringify(err.error));
      finalise.next();
      finalise.complete();
    });
  }

  get metiers(): Observable<Metier[]> {
    return this._metiers;
  }

}
