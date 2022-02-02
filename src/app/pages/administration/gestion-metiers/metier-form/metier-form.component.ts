import { Component, Input, OnInit } from '@angular/core';
import Metier from '../../../../interfaces/Metier';

@Component({
  selector: 'app-metier-form',
  templateUrl: './metier-form.component.html',
  styleUrls: ['./metier-form.component.scss']
})
export class MetierFormComponent implements OnInit {

  @Input() idForm!: string;
  @Input() metier: Metier;

  constructor() { }

  ngOnInit(): void {
  }

}
