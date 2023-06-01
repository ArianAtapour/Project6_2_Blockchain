import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";
import {Checklist, Department} from "../../models/interfaces";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-buyer-message',
  templateUrl: './buyer-message.component.html',
  styleUrls: ['./buyer-message.component.scss']
})
export class BuyerMessageComponent implements MessageComponent {
  gs: GameService;
  @Input() department = {} as Department;
  @Output() messageChange = new EventEmitter<{ message: string, department: Department, isApproved: boolean }>();
  buttonIndex = 0;

  constructor(private gameService: GameService) {
    this.gs = gameService;
  }
  sendMessage(event: { message: string, department: Department, isApproved: boolean }) {
    console.log("buyer-message Send Message");
    this.messageChange.emit(event);
    this.buttonIndex++;
  }

  callChecklistMethod() {

  }
}
