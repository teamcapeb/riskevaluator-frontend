import Question from '@/objects/Question';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnInit {



  closeResult = '';
  public title: string;
  @Input() question: Question;
  @ViewChild('modalDelete') modalDelete: any;
  @Output() onConfirmation: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public open(action: string) {
    let content = null;
     if(action === 'delete'){
      content = this.modalDelete;
      this.title = 'Supprimer';
    }
    this.modalService.open(content, {animation: true, centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result === 'Valider'){
        this.onConfirmation.emit({data: this.question, action: action});
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
