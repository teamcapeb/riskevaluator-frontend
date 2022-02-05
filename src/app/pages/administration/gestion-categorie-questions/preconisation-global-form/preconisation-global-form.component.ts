import PreconisationGlobale from '@/objects/PreconisationGlobale';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preconisation-global-form',
  templateUrl: './preconisation-global-form.component.html',
  styleUrls: ['./preconisation-global-form.component.scss']
})
export class PreconisationGlobalFormComponent implements OnInit {


  closeResult = '';
  public title: string;
  public registerForm: FormGroup;
  @Input() preconisationGlobale: PreconisationGlobale;
  @ViewChild('modalContentCreateOrUpdate') modalContentCreateOrUpdate: any;
  @ViewChild('modalDelete') modalDelete: any;
  @Output() onConfirmation: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      preconisationGlobaleName: new FormControl()
    });
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
        this.onConfirmation.emit({data: this.preconisationGlobale, action: action});
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
