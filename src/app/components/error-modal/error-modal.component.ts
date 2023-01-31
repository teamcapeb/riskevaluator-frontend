import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  providers: [NgbActiveModal]
})
export class ErrorModalComponent implements OnInit {

  @Input() public message: string;
  @Input() public modalRef: NgbModalRef;

  constructor(public activeModal: NgbActiveModal) { }

  close(){
  }

  dismiss(){
  }

  ngOnInit(): void {}

}
