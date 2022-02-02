import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() title!: string;
  @Input() formId: string;
  @Output() onAdd: EventEmitter<any> = new EventEmitter();

  @ContentChildren(ListItemComponent)
  listItems: QueryList<ListItemComponent>;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(){
  }

  add(event: any): void {
    this.onAdd.emit([event]);
  }

}
