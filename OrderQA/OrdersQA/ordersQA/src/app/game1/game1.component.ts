import { Component, OnInit } from '@angular/core';
import { POSTALCODE } from '../postalCode';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.css']
})
export class Game1Component implements OnInit {
  postalCode = POSTALCODE;
  constructor() { }
  ngOnInit() {
  }
}
