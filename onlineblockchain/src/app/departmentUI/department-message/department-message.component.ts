// DepartmentMessageComponent.ts
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Department } from '../../models/interfaces';

export interface MessageComponent {
  sendMessage(event: { message: string, department: Department, isApproved: boolean }): void;
  callChecklistMethod(): void;
}

@Component({
  selector: 'app-department-message',
  templateUrl: './department-message.component.html',
  styleUrls: ['./department-message.component.scss']
})
export class DepartmentMessageComponent {
  @Input() department: Department = {} as Department;
  @Input() sendBlockToBlockchain: ((message: string) => void) | undefined;
  @Output() messageChange = new EventEmitter<{ message: string, department: Department, isApproved: boolean }>();
  sendMessage(event: { message: string, department: Department, isApproved: boolean }) {
    console.log("buyer-message Send Message");
    this.messageChange.emit(event);
  }
  callChecklistMethod() {
  }
}
