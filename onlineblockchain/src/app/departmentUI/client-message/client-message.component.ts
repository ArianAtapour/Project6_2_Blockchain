import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";
import {Checklist, Department} from "../../models/interfaces";

@Component({
  selector: 'app-client-message',
  templateUrl: './client-message.component.html',
  styleUrls: ['./client-message.component.scss']
})
export class ClientMessageComponent implements MessageComponent {
  @Input() department = {} as Department;
  @Output() messageChange = new EventEmitter<{ message: string, department: Department, isApproved: boolean }>();
  sendMessage(event: { message: string, department: Department, isApproved: boolean }) {
    console.log("buyer-message Send Message");
    this.messageChange.emit(event);
  }

  callChecklistMethod() {
  }
}
