import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";
import {Checklist, Department} from "../../models/interfaces";

@Component({
  selector: 'app-buyer-message',
  templateUrl: './buyer-message.component.html',
  styleUrls: ['./buyer-message.component.scss']
})
export class BuyerMessageComponent implements MessageComponent {
  @Input() department = {} as Department;
  @Output() messageChange = new EventEmitter<{ message: string, department: Department, isApproved: boolean }>();
  sendMessage(event: { message: string, department: Department, isApproved: boolean }) {
    console.log("buyer-message Send Message");
    this.messageChange.emit(event);
  }

  callChecklistMethod() {

  }
}
