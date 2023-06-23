import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "../fire-conection.service";
import {Observable, of, Subscription, timer} from "rxjs";
import {Player} from "../../player";
import {OrdersComponent} from "../orders/orders.component";
import {Router} from "@angular/router";

@Component({
  selector: 'supplychain-classic',
  templateUrl: './supplychain-classic.html',
  styleUrls: ['./supplychain-classic.component.css']
})

export class SupplychainClassicComponent implements OnInit, OnDestroy{
  dataBase : AngularFireDatabase;
  orderData$: Observable<any[]> = of([]);
  orderData : any[] | undefined;
  moneyData$: Observable<any[]> = of([]);
  moneyData : any[] | undefined;
  moneyDataSubscription: Subscription | undefined;
  orderDataSubscription: Subscription | undefined;
  messagesSubscription: Subscription | undefined;
  timerSubscription : Subscription | undefined;
  messages: any[] = [];
  randomTimer: number = 0;
  randomTimerData: any[] | undefined;
  currentRole : string = "";
  value : any | undefined;
  showGM: boolean = false;
  showStore: boolean = false;
  showFinancier: boolean = false;
  showManufacturer: boolean = false;
  showShipper: boolean = false;
  storeMoney : number = 0;
  manufactureMoney : number = 0;
  orderCount : number = 0;
  orderPrice : number = 0;
  private timer: any;
  public currentTime: number = 0;
  startTime = 0;
  endTime : number = 0;
  timerSeconds : number = 0;
  timerSecondsString : string = "";
  timerMinutes : number = 0;
  currentTimeInSeconds = 0;
  timerSubtracted = 0;
  questionNumber = 0;
  questionData: Observable<any[]> = of([]);
  qData : any[] = [];
  questionDataSubscription: Subscription | undefined;

  constructor(private db: AngularFireDatabase, private fireConnectionService: FireConectionService, private router: Router) {
    //initialize database
    this.dataBase = db;
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  retrieveGameData(){
    //create the reference towards the data list
    const orderRef = this.db.list("orders");
    //define the table as the data of the users table
    this.orderData$ = orderRef.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.orderDataSubscription){
      this.orderDataSubscription = this.orderData$.subscribe((orderData) => {
        //update method
        this.orderData = orderData;

        if(this.orderData){
          let inCounter = 0
          this.orderData.forEach((order) => {
            if(inCounter == this.orderCount){
              this.orderPrice = order.price;
            } else {
              inCounter++;
            }
          })
        }
      });
    }

    //create the reference towards the data list
    const moneyRef = this.db.list("money");
    //define the table as the data of the users table
    this.moneyData$ = moneyRef.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.moneyDataSubscription){
      this.moneyDataSubscription = this.moneyData$.subscribe((moneyData) => {
        //update method
        this.moneyData = moneyData;
        if(this.moneyData){
          this.moneyData.forEach((money) => {
            if(money.role == "store"){
              this.storeMoney = money.money;
            } else {
              this.manufactureMoney = money.money;
            }
          })
        }
      });
    }
    this.messagesSubscription = this.fireConnectionService.getMessagesFromDatabase().subscribe(
      (items: any[]) => {
        this.messages = items;
      }
    );

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
          let questionNum = 0;
          this.qData.forEach((question) => {
            //make sure only the latest question is saved and ran and also if the question is not answered already
            if(questionNum == this.questionNumber && question.solved && question.isCorrect == "incorrect"){
              this.timerSubtracted += 10;
              questionNum++;
              return;
            } else if (questionNum == this.questionNumber && question.solved) {
              questionNum++;
            }
          })
        }
      });
    }
  }

  async ngOnInit() {
    this.startTime = Date.now();
    this.startTimer();
    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect();
    this.fireConnectionService.deleteMessageNodeOnDisconnect();
    this.fireConnectionService.deleteMoneyOnDisconnect();
    this.fireConnectionService.deleteTimerOnDisconnect();
    //retrieve and subscribe to user data table
    this.value = Player.getInstance().role;
    switch (this.value) {
      case "buyer":
        this.showGM = true;
        this.currentRole = this.value;
        break;

      case "store":
        this.showStore = true;
        this.currentRole = this.value;
        this.fireConnectionService.createMoneyNode(500, "store");
        break;

      case "financier":
        this.showFinancier = true;
        this.currentRole = this.value;
        break;

      case "manufacturer":
        this.showManufacturer = true;
        this.currentRole = this.value;
        this.fireConnectionService.createMoneyNode(500, "manufacturer");
        break;

      case "shipper":
        this.showShipper = true;
        this.currentRole = this.value;
        break;
    }
    this.retrieveGameData();
  }
  titles = 'SupplyChain';
  // @ts-ignore
  senderFinancier : any;
  // @ts-ignore
  senderStore: any;
  // @ts-ignore
  senderManufacturer: any;
  // @ts-ignore
  senderShipper: any;

  goodNumber : number = 0;
  badNumber : number = 0;

  pushTextWithRole(text: string, role: string){
    if(role == "buyer"){
      this.storeMoney += this.orderPrice;
      this.fireConnectionService.updateMoney({money: this.storeMoney}, "store");
    }
    // @ts-ignore
    let textToSend = this[text];
    // @ts-ignore
    this[text] = '';
    this.fireConnectionService.addTextToDatabase(textToSend, role);
  }

  storeToManufacturer(text: string, role: string) {
    this.pushTextWithRole(text, role);

    let manufMoney = this.manufactureMoney;
    manufMoney += (this.orderPrice * 0.8);
    let storeMoney = this.manufactureMoney - (this.orderPrice * 0.8);

    this.fireConnectionService.updateMoney({money: manufMoney}, "manufacturer");
    this.fireConnectionService.updateMoney({money: storeMoney}, "store");
  }

  manufToShipper(text: string, role: string) {
    this.pushTextWithRole(text, role);

    let manufMoney = this.manufactureMoney;
    manufMoney -= (this.orderPrice * 0.6);

    this.fireConnectionService.updateMoney({money: manufMoney}, "manufacturer");
  }

  isMessageVisible(item?: any): boolean {
    // Check if the user's role allows viewing the item
    return this.currentRole === item.role;
  }

  startTimer() {
    this.currentTime = Date.now();
    this.endTime = Date.now() + 600000;
    this.timer = setInterval(() => {
      //formulate timer
      this.currentTime = Date.now() + (this.timerSubtracted * 1000);
      this.currentTimeInSeconds = Math.round((this.currentTime / 1000) - this.startTime / 1000);
      this.timerSeconds = 60 - (this.currentTimeInSeconds % 60);
      if(this.timerSeconds < 10){
        this.timerSecondsString = "0" + this.timerSeconds;
      } else {
        this.timerSecondsString = this.timerSeconds.toString();
      }
      this.timerMinutes = 9 - Math.trunc(this.currentTimeInSeconds / 60);
      if((this.currentTime >= this.endTime - 1000) && (this.currentTime <= this.endTime + 1000)){
        this.stopTimer();
        this.router.navigate(['end-game']);
      }
    }, 1000);
  }
}
