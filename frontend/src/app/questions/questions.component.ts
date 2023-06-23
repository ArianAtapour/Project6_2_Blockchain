import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "../fire-conection.service";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit{
  dataBase: AngularFireDatabase;
  orderData$: Observable<any[]> = of([]);
  orderData : any[] = [];
  orderDataSubscription: Subscription | undefined;
  checkAnswer!:boolean;
  orderC:number= 0;
  possibleQuestions : string[] = [];
  questionNumber = 0;
  questionString = "";
  questionAnswer = "";

  //answers to the questions
  question1Answer = "";
  question2Answer = "";
  question3Answer = "";

  //random answers plus one correct answer
  answer1 = "";
  answer2 = "";
  answer3 = "";
  answer4 = "";

  //questions
  question1 = 0;
  question2 = 0;
  question3 = 0;
  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
    this.retrieveData();
  }

    onQuestionSubmit(value:any){
    if(this.possibleQuestions[this.question1] == value.questionSelect){
      this.questionString = value.questionSelect;
      this.makeAnswers();
      this.questionAnswer = this.question1Answer;
      this.fireConnectionService.addQuestion(this.possibleQuestions[this.question1], this.question1Answer, false, this.questionNumber, this.answer1, this.answer2, this.answer3, this.answer4, "");
    } else if(this.possibleQuestions[this.question2] == value.questionSelect){
      this.questionString = value.questionSelect;
      this.makeAnswers();
      this.questionAnswer = this.question2Answer;
      this.fireConnectionService.addQuestion(this.possibleQuestions[this.question2], this.question2Answer, false, this.questionNumber, this.answer1, this.answer2, this.answer3, this.answer4, "");
    } else if(this.possibleQuestions[this.question3] == value.questionSelect){
      this.questionString = value.questionSelect;
      this.makeAnswers();
      this.questionAnswer = this.question3Answer;
      this.fireConnectionService.addQuestion(this.possibleQuestions[this.question3], this.question3Answer, false, this.questionNumber, this.answer1, this.answer2, this.answer3, this.answer4, "");
    } else {return}
    this.questionNumber++;
  }

  retrieveData(){
    //create the reference towards the data list
    const orders = this.db.list("orders");
    //define the table as the data of the users table
    this.orderData$ = orders.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.orderDataSubscription){
      this.orderDataSubscription = this.orderData$.subscribe((data) => {
        //update method
        this.orderData = data;
        this.makeQuestions();
      });
    }
  }

  async ngOnInit(){
    this.retrieveData();
    this.fireConnectionService.deleteQuestionsOnDisconnect();
  }

  makeQuestions(){
    this.possibleQuestions = [];
    //get three random questions
    let question1 = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    let question2 = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    //make sure they aren't the same number
    //also make sure there are enough questions to do so
    if(this.orderData.length >= 1){
      while(question1 == question2){
        question2 = Math.floor(Math.random() * (this.orderData.length + 1));
      }
    }
    let question3 = Math.floor(Math.random() * (this.orderData.length + 1));
    //make sure the third number is not equal to 1 or 2
    if(this.orderData.length >= 2){
      while(question1 == question3 || question2 == question3){
        question3 = Math.floor(Math.random() * (this.orderData.length + 1));
      }
    }
    //name of the parts
    let question1Part;
    let question2Part;
    let question3Part;

    //part type
    let question1PartType;
    let question2PartType;
    let question3PartType;

    //pick a part randomly
    switch(Math.floor(Math.random() * (2 - 0 + 1) + 0)){
      case 0:
        question1Part = this.orderData[question1]?.manuf;
        question1PartType = "manuf";
        break;
      case 1:
        question1Part = this.orderData[question1]?.cpu;
        question1PartType = "cpu";
        break;
      case 2:
        question1Part = this.orderData[question1]?.gpu;
        question1PartType = "gpu";
        break;
    }
    if(question2 != null && this.orderData.length >= 2){
      switch(Math.floor(Math.random() * (2 - 0 + 1) + 0)){
        case 0:
          question2Part = this.orderData[question2]?.manuf;
          question2PartType = "manuf";
          break;
        case 1:
          question2Part = this.orderData[question2]?.cpu;
          question2PartType = "cpu";
          break;
        case 2:
          question2Part = this.orderData[question2]?.gpu;
          question2PartType = "gpu";
          break;
      }
    }

    if(question3 != null && this.orderData.length >= 3){
      switch(Math.floor(Math.random() * (2 - 0 + 1) + 0)){
        case 0:
          question3Part = this.orderData[question3]?.manuf;
          question3PartType = "manuf";
          break;
        case 1:
          question3Part = this.orderData[question3]?.cpu;
          question3PartType = "cpu";
          break;
        case 2:
          question3Part = this.orderData[question3]?.gpu;
          question3PartType = "gpu";
          break;
      }
    }
    //make a question based on that part
    if(question1Part && question1PartType){
      if(question1PartType == "manuf"){
        this.possibleQuestions.push("which order was manufactured by " + question1Part + "?");
      } else if (question1PartType == "cpu"){
        this.possibleQuestions.push("which order used the " + question1Part + " CPU?");
      } else {
        this.possibleQuestions.push("which order used the " + question1Part + " GPU?")
      }
    }
    if(question2Part && question2PartType){
      if(question2PartType == "manuf"){
        this.possibleQuestions.push("which order was manufactured by " + question2Part + "?");
      } else if (question2PartType == "cpu"){
        this.possibleQuestions.push("which order used the " + question2Part + " CPU?");
      } else {
        this.possibleQuestions.push("which order used the " + question2Part + " GPU?")
      }
    }
    if(question3Part && question3PartType){
      if(question3PartType == "manuf"){
        this.possibleQuestions.push("which order was manufactured by " + question3Part + "?");
      } else if (question3PartType == "cpu"){
        this.possibleQuestions.push("which order used the " + question3Part + " CPU?");
      } else {
        this.possibleQuestions.push("which order used the " + question3Part + " GPU?")
      }
    }
    //have potential answers
    this.question1Answer = this.orderData[question1].orderC;
    this.question2Answer = this.orderData[question2].orderC;
    this.question3Answer = this.orderData[question3].orderC;
  }

  makeAnswers(){
    //first check if there is even a question
    if(this.questionString != ""){
      //check how many orders there are
      //if not enough orders just make up 1, 2 and 3
      if(this.orderData.length < 3){
        this.answer1 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        this.answer2 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        while(this.answer2 == this.answer1){
          this.answer2 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        }
        this.answer3 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        while(this.answer3 == this.answer1 || this.answer3 == this.answer2){
          this.answer3 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        }
        this.answer4 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        while(this.answer4 == this.answer1 || this.answer4 == this.answer2 || this.answer4 == this.answer3){
          this.answer4 = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        }
      } else {
        //decide with answer will be correct
        let correctAnswer = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0);
        if(correctAnswer == 1){
          this.answer1 = this.questionAnswer;
        } else {
          this.answer1 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          while(this.answer1 == this.questionAnswer){
            this.answer1 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          }
        }
        if(correctAnswer == 2){
          this.answer2 = this.questionAnswer;
        } else {
          this.answer2 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          while(this.answer2 == this.answer1 || this.answer2 == this.questionAnswer){
            this.answer2 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          }
        }
        if(correctAnswer == 3){
          this.answer3 = this.questionAnswer;
        } else {
          this.answer3 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          while(this.answer3 == this.answer1 || this.answer3 == this.answer2 || this.answer3 == this.questionAnswer){
            this.answer3 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          }
        }
        if(correctAnswer == 4){
          this.answer4 = this.questionAnswer;
        } else {
          this.answer4 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          while(this.answer4 == this.answer1 || this.answer4 == this.answer2 || this.answer4 == this.answer3 || this.answer4 == this.questionAnswer){
            this.answer4 = Math.floor(Math.random() * (this.orderData.length - 0 + 1) + 0).toString();
          }
        }
      }
    }
  }
}
