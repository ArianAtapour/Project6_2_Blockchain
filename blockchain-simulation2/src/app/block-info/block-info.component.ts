import {Component, Inject, Injectable, Input} from '@angular/core';
import {Department} from "../department/department";

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class BlockInfoComponent {
  @Input() hash: number;
  @Input() id: number
  @Input() department: string;
  @Input() description: string;
  @Input() message: string;

  constructor() {
    this.hash = 0;
    this.id = 0;
    this.department = "";
    this.description = "";
    this.message = "";
  }

  protected readonly Department = Department;
}
