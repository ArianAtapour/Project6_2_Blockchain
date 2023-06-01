import { Component } from '@angular/core';
import {MessageComponent} from "../department-message/department-message.component";

@Component({
  selector: 'app-shipper-message',
  templateUrl: './shipper-message.component.html',
  styleUrls: ['./shipper-message.component.scss']
})
export class ShipperMessageComponent implements MessageComponent {
  message: string = "";
  sendMessage() {
  }
  callChecklistMethod() {
  }
}
