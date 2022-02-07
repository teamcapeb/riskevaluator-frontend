import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Reponse from '../../../../../objects/Reponse';

@Component({
  selector: 'app-reponse-form',
  templateUrl: './reponse-form.component.html',
  styleUrls: ['./reponse-form.component.scss']
})
export class ReponseFormComponent implements OnInit {

  closeResult = '';
  public title: string = 'Ajouter';
  @Input() reponse: Reponse;
  @ViewChild('modalContentCreateOrUpdate') modalContentCreateOrUpdate: any;
  @ViewChild('modalDelete') modalDelete: any;
  @Output() onConfirmation: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public open(action: string) {
    let content = null;
    if(action === 'add' || action === 'update'){
      content = this.modalContentCreateOrUpdate;
      this.title = action === 'add' ? 'Ajouter' : 'Modifier';
    }else if(action === 'delete'){
      content = this.modalDelete;
      this.title = 'Supprimer';
    }
    this.modalService.open(content, {animation: true, centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result)
      if(result === 'Valider'){
        this.onConfirmation.emit({data: this.reponse, action: action});
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
