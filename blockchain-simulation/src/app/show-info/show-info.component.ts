import {Component, Inject, Input} from '@angular/core';
import {Department} from "../department";

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent {
  @Input() department: Department = {} as Department;
  @Input() message: string = "";
  @Input() status: boolean = false;
  display: boolean = false;

}
