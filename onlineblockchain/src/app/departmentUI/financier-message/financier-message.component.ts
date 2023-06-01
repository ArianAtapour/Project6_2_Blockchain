import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";
import {Department} from "../../models/interfaces";

@Component({
  selector: 'app-financier-message',
  templateUrl: './financier-message.component.html',
  styleUrls: ['./financier-message.component.scss']
})
export class FinancierMessageComponent implements MessageComponent {
  @Input() department = {} as Department;
  @Output() messageChange = new EventEmitter<{ message: string, department: Department, isApproved: boolean }>();
  sendMessage(event: { message: string, department: Department, isApproved: boolean }) {
    console.log("buyer-message Send Message");
    this.messageChange.emit(event);
  }
  callChecklistMethod() {
  }
}
