import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";
import {Department} from "../../models/interfaces";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-shipper-message',
  templateUrl: './shipper-message.component.html',
  styleUrls: ['./shipper-message.component.scss']
})
export class ShipperMessageComponent implements MessageComponent {
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
