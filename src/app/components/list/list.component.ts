import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() title!: string;
  @Input() header: boolean = true;
  @Output() onAdd: EventEmitter<any> = new EventEmitter();


  @ContentChildren(ListItemComponent)
  listItems: QueryList<ListItemComponent>;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {}

  ngAfterViewInit(){
  }

  add(): void {
    this.onAdd.emit({action:'add'});
  }

}
