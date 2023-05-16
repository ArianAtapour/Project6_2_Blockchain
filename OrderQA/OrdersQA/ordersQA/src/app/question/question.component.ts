import { Component, OnInit, Input, Output, OnDestroy, HostListener, EventEmitter } from '@angular/core';
import { Qa } from '../qa';
import { POSTALCODE } from "../postalCode";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  @Input() qas: Qa[];
  @Output() answerEvent = new EventEmitter<boolean>;
  public displayQuestion: boolean;
  public question: Qa;
  public choiceIndex: number;
  public clicked: boolean;
  public answer: boolean;
  public index: number;
  constructor() { }
  ngOnInit() {
    console.log('Items created');
    this.displayQuestion = true;
    this.clicked = false;
    this.answer = true;
    this.choiceIndex = -1;
    console.log(
      this.question = POSTALCODE[Math.floor(Math.random()*POSTALCODE.length)]
    );
  }

  newQuestion() {
    this.displayQuestion = true;
    this.clicked = false;
    this.answer = true;this.clicked = false;
    this.answer = true;
    this.choiceIndex = -1;
    console.log(
      this.question = POSTALCODE[Math.floor(Math.random()*POSTALCODE.length)]
    );
  }
  deleteQuestion() {
    this.displayQuestion = false;
  }

  checkAnswer() {
    if(this.clicked && this.choiceIndex == this.question.answerIndex) {
      this.answer = true;
      this.correctAnswer();
      return true;
    }
    this.answer = false;
    this.incorrectAnswer();
    return false;
  }

  correctAnswer() {
    //DESTROY
    // this.answerEvent.emit(this.answer);
    this.deleteQuestion();
    console.log("CORRECT!");
  }

  incorrectAnswer() {
    //DESTROY + PUNISHMENT
    // this.answerEvent.emit(this.answer);
    this.deleteQuestion();
    console.log("INCORRECT!");
  }

  protected readonly POSTALCODE = POSTALCODE;
}
