import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import {QuestionComponent} from "../question/question.component";


@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})

export class TriggerComponent {
  //Child Reference
  @ViewChild(QuestionComponent) childRef: QuestionComponent

  //TIMER FOR TRIGGER OF QUESTIONS
  //I would say (30, 120) for the official game | change it for testing purposes
  timeLeft = this.randomNumber(1, 5);

  interval;
  displayTrigger = false;
  constructor() {
    this.displayTrigger = false;
    this.startTimer();
  }

  //Referencing of Child's method
  destroyChild() {
    if (this.childRef) {
      this.childRef.deleteQuestion();
    }
  }
  randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  startTimer() {
    this.interval = setInterval(() => {
      console.log(this.timeLeft);
      let one = false;
      //Stop timer if question hasn't been answered
      if(this.timeLeft > 0) {
        if (this.childRef) {
          if (this.childRef.clicked && !one) {
            this.timeLeft--;
            one = true;
          }
        } else if (!one) {
          this.timeLeft--;
          one = true;
        }
      } else {
        //time ran out, trigger new question
        if(this.childRef) {
          this.childRef.newQuestion();
        }
        this.displayTrigger = true;
        this.timeLeft = this.randomNumber(1, 5);

      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


  // <button (click)='startTimer()'>Start Timer</button>
  // <button (click)='pauseTimer()'>Pause</button>
  //
  //   <p>{{timeLeft}} Seconds Left....</p>

}
