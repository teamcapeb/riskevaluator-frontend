import { Component, Input, OnInit } from "@angular/core";


export interface IOopsMessageInput {
  title: any;
  message: any;
  goToUrl: any;
  buttonText: any;
}
@Component({
  selector: 'app-oops-message',
  templateUrl: './oops-message.component.html',
  styleUrls: ['./oops-message.component.scss']
})
export class OopsMessageComponent implements OnInit {

  @Input() oopsInput : IOopsMessageInput;
  constructor() { }

  ngOnInit(): void {
  }

}
