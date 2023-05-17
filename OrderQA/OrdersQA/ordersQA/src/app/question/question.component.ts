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

  checkAnswer(choice: number) {
    this.clicked = true;
    //check if user's answer is the correct answer
    const isCorrect = (choice == this.question.answerIndex);
    this.answer = isCorrect;
    this.handleAnswer(isCorrect);

    return isCorrect;
  }

  handleAnswer(isCorrect: boolean) {
    if(isCorrect) {
      //TODO: Implement what happens when correct answer
      this.deleteQuestion();
      console.log("CORRECT!");
    } else {
      //TODO: Implement what happens when incorrect answer
      this.deleteQuestion();
      console.log("INCORRECT!");
    }
  }
}
