import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-timeLeft',
  templateUrl: './timeLeft.component.html',
  styleUrls: ['./timeLeft.component.css']
})
export class TimeLeftComponent implements OnInit {
  @Input() answer = true;
  @Output() timeExpiredEvent = new EventEmitter<boolean>; boolean


  // timeLeft: number = Math.floor((this.randomNumber(30, 120)));
  timeLeft: number = 15;
  interval;

  ngOnInit() {
    this.startTimer();
  }

  randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0 && this.answer) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.timeExpiredEvent.emit(false);
      }
    },1000)
  }


  // <button (click)='startTimer()'>Start Timer</button>
  // <button (click)='pauseTimer()'>Pause</button>
  //
  //   <p>{{timeLeft}} Seconds Left....</p>

}
