import { Component, Input } from '@angular/core';
import {Checklist, Department, Product} from '../models/interfaces';

@Component({
  selector: 'app-product-checklist',
  templateUrl: './product-checklist.component.html',
  styleUrls: ['./product-checklist.component.scss'],
})
export class ProductChecklistComponent {
  @Input() checklist = {} as Checklist;
  @Input() id: number = 0;
  @Input() product = "";
  protected readonly Department = Department;

  get checklistArray(): boolean[] {
    // Convert the checklist object to an array of booleans
    return Object.values(this.checklist);
  }
}
