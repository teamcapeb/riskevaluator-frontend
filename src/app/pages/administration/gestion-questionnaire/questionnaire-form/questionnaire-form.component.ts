import Questionnaire from '@/objects/Questionnaire';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss']
})
export class QuestionnaireFormComponent implements OnInit {

  closeResult = '';
  public title: string;
  public registerForm: FormGroup;
  @Input() questionnaire: Questionnaire;
  @ViewChild('modalContentCreateOrUpdate') modalContentCreateOrUpdate: any;
  @ViewChild('modalDelete') modalDelete: any;
  @Output() onConfirmation: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      metierName: new FormControl()
    });
  }


  public open(action: string) {
    let content = null;
    if(action === 'add' ){
      content = this.modalContentCreateOrUpdate;
      this.title =  'Ajouter' ;
    }else if(action === 'delete'){
      content = this.modalDelete;
      this.title = 'Supprimer';
    }
    this.modalService.open(content, {animation: true, centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result)
      if(result === 'Valider'){
        this.onConfirmation.emit({data: this.questionnaire, action: action});
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
