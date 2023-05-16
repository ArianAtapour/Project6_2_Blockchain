import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import {QuestionComponent} from "../question/question.component";


@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent {
  @ViewChild(QuestionComponent) childRef: QuestionComponent
  timeLeft = this.randomNumber(30, 120);
  interval;
  displayTrigger = false;
  private readonly onDestroy: Subject<any> = new Subject<any>();
  constructor() {
    console.log("CONSTRUCTOR");
    this.displayTrigger = false;
    this.startTimer();
  }


  destroyChild() {
    if (this.childRef) {
      this.childRef.deleteQuestion();
    }
  }

  // display()
  // {
  //   this.displayTrigger = true;
  // }

  randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  startTimer() {
    this.interval = setInterval(() => {
      console.log(this.timeLeft);
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        console.log("NOW!");
        if(this.childRef) {
          this.childRef.newQuestion();
        }
        this.displayTrigger = true;
        this.timeLeft = this.randomNumber(30, 120);

      }
    },1000)
  }


  // <button (click)='startTimer()'>Start Timer</button>
  // <button (click)='pauseTimer()'>Pause</button>
  //
  //   <p>{{timeLeft}} Seconds Left....</p>

}
