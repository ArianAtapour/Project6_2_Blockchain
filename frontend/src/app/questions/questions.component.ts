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
  gameDataSubscription: Subscription | undefined;
  checkAnswer!:boolean;
  orderC:number= 0;
  possibleQuestions : string[] = [];
  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
  }

  onSubmit(value:any){
    this.fireConnectionService.addQuestion(value, this.checkAnswer);
  }

  retrieveData(){
    //create the reference towards the data list
    const orders = this.db.list("orders");
    //define the table as the data of the users table
    this.orderData$ = orders.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.gameDataSubscription){
      this.gameDataSubscription = this.orderData$.subscribe((data) => {
        //update method
        this.orderData = data;
      });
    }
  }

  async ngOnInit(){
    this.retrieveData();
    this.fireConnectionService.deleteQuestionsOnDisconnect();
    this.makeQuestions();
  }

  makeQuestions(){
    //get three random questions
    let question1 = Math.floor(Math.random() * (this.orderData.length + 1));
    let question2 = Math.floor(Math.random() * (this.orderData.length + 1));
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
      while(question1 == question3 && question2 == question3){
        question3 = Math.floor(Math.random() * (this.orderData.length + 1));
      }
    }
    let question1Part;
    let question2Part;
    let question3Part;
    //pick a part randomly
    switch(Math.floor(Math.random() * (2 - 0 + 1) + 0)){
      case 0:
        question1Part = this.orderData[question1].manuf;
        break;
      case 1:
        question1Part = this.orderData[question1].cpu;
        break;
      case 2:
        question1Part = this.orderData[question1].gpu;
        break;
    }
    if(question2 != null){
      switch(Math.floor(Math.random() * (2 - 0 + 1) + 0)){
        case 0:
          question2Part = this.orderData[question2].manuf;
          break;
        case 1:
          question2Part = this.orderData[question2].cpu;
          break;
        case 2:
          question2Part = this.orderData[question2].gpu;
          break;
      }
    }

    if(question3 != null){
      switch(Math.floor(Math.random() * (2 - 0 + 1) + 0)){
        case 0:
          question3Part = this.orderData[question3].manuf;
          break;
        case 1:
          question3Part = this.orderData[question3].cpu;
          break;
        case 2:
          question3Part = this.orderData[question3].gpu;
          break;
      }
    }
    console.log("question1part: " + question1Part);
    console.log("question2part: " + question2Part);
    console.log("question3part: " + question3Part);
    //make a question based on that part
    //have potential answers
  }
}
