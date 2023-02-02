import { IMetier } from "@/interfaces/IMetier";
import Metier from "@/objects/Metier";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MetierService } from "../../../services/serviceMetier/metier.service";
import IListEvent from "@/interfaces/IListEvent";
import { ModalService } from "@services/serviceModal/modal.service";

@Component({
  selector: 'app-gestion-metiers',
  templateUrl: './gestion-metiers.component.html',
  styleUrls: ['./gestion-metiers.component.scss']
})
export class GestionMetiersComponent implements OnInit {

  metiers: IMetier[];

  @ViewChild('metierForm') metierForm: any;
  @ViewChild('errorModal') errorModal: any;

  public actualMetier: Metier;

  constructor(private metierService: MetierService,
              private modalService: ModalService
            ) { }

  ngOnInit(): void {
    this.metierService.getAllMetiers().subscribe((res) => {
      this.metiers = this.sortMetiers(res);
    });
  }

  sortMetiers(metiers: IMetier[]): IMetier[] {
    return metiers.sort(
      (a, b) => {
        if (a.nomMetier.toUpperCase() < b.nomMetier.toUpperCase()) {
          return -1;
        }
        if (a.nomMetier.toUpperCase() > b.nomMetier.toUpperCase()) {
          return 1;
        }
        return 0;
      }
    );
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
    this.metiers = null;
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
    this.metierService.getAll().subscribe((res) => {
      this.metiers = this.sortMetiers(res);
    });
  }
}
