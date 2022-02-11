import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {'class': 'row'}
})
export class ListItemComponent implements OnInit {

  @Input() id!: string;
  @Input() data!: any;
  @Input() header: boolean = false;


  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    this.onDelete.emit({data: this.data, action:'delete'});
  }

  update(): void {
    this.onUpdate.emit({data: this.data, action:'update'});
  }

  rowClick(): void {
    this.onRowClick.emit({data: this.data, action:'click'});
  }

}
