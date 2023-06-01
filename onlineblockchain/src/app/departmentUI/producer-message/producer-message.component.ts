import { Component } from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";

@Component({
  selector: 'app-producer-message',
  templateUrl: './producer-message.component.html',
  styleUrls: ['./producer-message.component.scss']
})
export class ProducerMessageComponent implements MessageComponent {
  message: string = "";
  sendMessage() {
  }

  callChecklistMethod() {
  }
}
