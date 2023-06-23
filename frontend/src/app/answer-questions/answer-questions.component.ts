import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "../fire-conection.service";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css']
})
export class AnswerQuestionsComponent {
  isPopupOpen = false;
  dataBase : AngularFireDatabase;
  questionData: Observable<any[]> = of([]);
  qData : any[] = [];
  questionDataSubscription: Subscription | undefined;
  questionNumber = 0;
  questionString = "";
  questionAnswer = "";
  answer1 = "";
  answer2 = "";
  answer3 = "";
  answer4 = "";

  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    this.isPopupOpen = false;
    this.dataBase = db;
    this.retrieveGameData();
  }

  retrieveGameData(){
    //create the reference towards the data list
    const questionRef = this.db.list("questions");
    //define the table as the data of the users table
    this.questionData = questionRef.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.questionDataSubscription){
      this.questionDataSubscription = this.questionData.subscribe((data) => {
        //update method
        this.qData = data;
        if(this.qData) {
          this.qData.forEach((question) => {
            if(question != null){
              //make sure only the latest question is saved and ran and also if the question is not answered already
              this.questionString = question.question;
              this.questionAnswer = question.answer;
              this.answer1 = question.answer1;
              this.answer2 = question.answer2;
              this.answer3 = question.answer3;
              this.answer4 = question.answer4;
              this.isPopupOpen = true;
              return;
            } else {
              this.isPopupOpen = false;
            }
          })
        }
      });
    }
  }

  onAnswerSubmit(value: any) {
    //check which box was checked and then check if they are correct
    if(value.answer == "answer1"){
      this.checkAnswer(this.answer1);
    } else if (value.answer == "answer2"){
      this.checkAnswer(this.answer2);
    } else if (value.answer == "answer3"){
      this.checkAnswer(this.answer3);
    } else if (value.answer == "answer4"){
      this.checkAnswer(this.answer4);
    }
    this.fireConnectionService.deleteQuestion();
  }

  //when correct close update question to be answered and close box
  //if wrong do same and remove time
  checkAnswer(answer: string): boolean {
    if(answer == this.questionAnswer){
      this.fireConnectionService.updateQuestion({solved: true, isCorrect: "correct"}, this.questionNumber);
      this.isCorrect = true;
      this.correctAnswer();
      this.questionNumber++;
      return true;
    } else {
      this.fireConnectionService.updateQuestion({solved: true, isCorrect: "incorrect"}, this.questionNumber);
      this.isIncorrect = true;
      this.incorrectAnswer();
      this.questionNumber++;
      return false;
    }
  }

  isCorrect : boolean = false;
  correctAnswer(){
    setTimeout(() => {
      // Perform the desired action here
      this.isPopupOpen = false;
      this.isCorrect = false;
    }, 2000);
  }

  isIncorrect : boolean = false;
  incorrectAnswer(){
    setTimeout(() => {
      // Perform the desired action here
      this.isPopupOpen = false;
      this.isIncorrect = false;
    }, 2000);
  }
}
