import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-timeLeft',
  templateUrl: './timeLeft.component.html',
  styleUrls: ['./timeLeft.component.css']
})
export class TimeLeftComponent implements OnInit {
  @Input() answer = true;
  @Output() timeExpiredEvent = new EventEmitter<boolean>; boolean

  //HOW LONG THE USER HAS TO PICK AN ANSWER
  timeLeft: number = 15;

  interval;

  ngOnInit() {
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      //if answered incorrectly: timeLeft = 0
      if(this.timeLeft > 0 && this.answer) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        //if time runs out, run incorrectAnswer() in app-question
        this.timeExpiredEvent.emit(false);
      }
    },1000)
  }

}
