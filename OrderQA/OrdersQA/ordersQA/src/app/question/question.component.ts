import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    this.newQuestion();
  }

  //setup new question
  newQuestion() {
    this.displayQuestion = true;
    this.clicked = false;
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
    //check if user's answer is the correct answer
    if(this.clicked && this.choiceIndex == this.question.answerIndex) {
      this.answer = true;
      this.correctAnswer();
      return true;
    }
    this.answer = false;
    this.incorrectAnswer();
    return false;
  }

  //TODO: Implement what happens when correct answer
  correctAnswer() {
    //DESTROY
    // this.answerEvent.emit(this.answer);
    this.deleteQuestion();
    console.log("CORRECT!");
  }

  //TODO: Implement what happens when incorrect answer
  incorrectAnswer() {
    //DESTROY + PUNISHMENT
    // this.answerEvent.emit(this.answer);
    this.deleteQuestion();
    console.log("INCORRECT!");
  }
}
