import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Department} from "../../models/interfaces";

@Component({
  selector: 'app-spectator-message',
  templateUrl: './spectator-message.component.html',
  styleUrls: ['./spectator-message.component.scss']
})
export class SpectatorMessageComponent {
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
