// DepartmentMessageComponent.ts
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Department} from '../../models/interfaces';
import {GameService} from "../../services/game.service";

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
  gs: GameService;
  @Input() department = {} as Department;
  @Output() messageChange = new EventEmitter<{ message: string, department: Department, isApproved: boolean }>();
  buttonIndex = 0;

  constructor(private gameService: GameService) {
    this.gs = gameService;
  }
  sendMessage(event: { message: string, department: Department, isApproved: boolean }) {
    console.log("buyer-message Send Message");
    this.gs.setButtonState(this.department.id, this.buttonIndex);
    this.messageChange.emit(event);
    this.buttonIndex++;
  }
  

  callChecklistMethod() {

  }
}
