import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Qa } from '../qa';
import { Game1, Game2, Game3 } from "../questions";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  @Input() qas: Qa[];
  @Output() answerEvent = new EventEmitter<boolean>;

  public game: Qa[]
  public displayQuestion: boolean;
  public question: Qa;
  public choiceIndex: number;
  public clicked: boolean;
  public answer: boolean;
  public questionIndex: number;
  // public gameCollection = new Array(3);
  constructor(game: Qa[]) {
    // this.game = game;
    this.game = Game1;
    this.questionIndex = 0;
    // this.gameCollection.push(Game1);
    // this.gameCollection.push(Game2);
    // this.gameCollection.push(Game3);
  }
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
      // this.question = Game1[Math.floor(Math.random()*Game1.length)]
      // this.question = this.gameCollection[Math.floor(Math.random()*2)][this.questionIndex > Game1.length ? this.questionIndex = 0 : this.questionIndex++]
      this.question = this.game[this.questionIndex >= this.game.length ? this.questionIndex = 0 : this.questionIndex++]
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
    this.clicked = true;
    if(isCorrect) {
      //TODO: Implement what happens when correct answer
      this.deleteQuestion();
      console.log("CORRECT!");
    } else {
      //TODO: Implement what happens when incorrect answer
      //repeat question if incorrect
      this.questionIndex--;
      this.deleteQuestion();
      console.log("INCORRECT!");
    }
  }
}
