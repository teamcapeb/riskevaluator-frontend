import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-col',
  templateUrl: './list-item-col.component.html',
  styleUrls: ['./list-item-col.component.scss'],
  host: {'class': 'col d-flex'}
})
export class ListItemColComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
