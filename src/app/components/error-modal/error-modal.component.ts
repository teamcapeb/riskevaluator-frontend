import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  @Input() public message: string;
  @ViewChild('modalError') modalError: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public open(message: string) {
    this.message = message;
    let content = null;
    this.modalService.open(this.modalError, {animation: true, centered: true});
  }

}
