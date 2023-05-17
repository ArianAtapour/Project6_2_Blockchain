import {Component, ViewChild} from '@angular/core';
import {TriggerComponent} from "../trigger/trigger.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @ViewChild(TriggerComponent) childRef: TriggerComponent

  pauseTimer()
  {
    if(this.childRef) {
      this.childRef.pauseTimer();
    }
  }
  resumeTimer()
  {
    if(this.childRef) {
      this.childRef.startTimer();
    }
  }

}
