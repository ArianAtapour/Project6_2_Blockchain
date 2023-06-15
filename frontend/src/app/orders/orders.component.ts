import {Component, ElementRef, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Router} from "@angular/router";
import {FireConectionService} from "../fire-conection.service";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  dataBase: AngularFireDatabase;
  gameData$: Observable<any[]> = of([]);
  data : any[] | undefined;
  gameDataSubscription: Subscription | undefined;
  messages: any[] = [];
  storeMoney : number = 0;
  manufactureMoney : number = 0;
  orderCount : number = 0;
  orderPrice : number = 0;
  orderData$: Observable<any[]> = of([]);
  orderData : any[] | undefined;
  moneyData$: Observable<any[]> = of([]);
  moneyData : any[] | undefined;
  moneyDataSubscription: Subscription | undefined;
  orderDataSubscription: Subscription | undefined;
  messagesSubscription: Subscription | undefined;

  manuf!:string;
  cpu!:string;
  gpu!:string;
  orderC:number= 0;
  selectedOrder: any;
  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
    this.retrieveGameData();
  }

  onSubmit(value: any) {
    //make arrays holding their values
    let manufList = this.getDropDownItemArray("manuf");
    let cpuList = this.getDropDownItemArray("cpu");
    let gpuList =  this.getDropDownItemArray("gpu");

    //variables holding the part prices which will be added up at the end
    let manufPrice = 0;
    let cpuPrice = 0;
    let gpuPrice = 0;

    //calculate based on how far an item is in the array the price of the parts
    if(manufList){
      for (let i = 0; i < manufList.length; i++) {
        if(value.manuf.toLowerCase() == manufList[i].toLowerCase()){
          manufPrice = 50 * (i + 1);
          break;
        }
      }
    }
    if(cpuList){
      for (let i = 0; i < cpuList.length; i++) {
        if(value.cpu.toLowerCase() == cpuList[i].toLowerCase()){
          cpuPrice = 100 * (i + 1);
          break;
        }
      }
    }
    if(gpuList){
      for (let i = 0; i < gpuList.length; i++) {
        if(value.gpu.toLowerCase() == gpuList[i].toLowerCase()){
          gpuPrice = 150 * (i + 1);
          break;
        }
      }
    }

    //calculate the total price
    let totalPrice = manufPrice + cpuPrice + gpuPrice;

    this.fireConnectionService.createOrder(value.manuf, value.cpu, value.gpu, this.orderC, false, totalPrice);
      this.storeMoney += totalPrice;
      this.fireConnectionService.updateMoney({money: this.storeMoney}, "store");

    this.fireConnectionService.addTextToDatabase("Manufacturer: " + value.manuf + ", CPU: " + value.cpu + ", GPU: " + value.gpu + ", that costs " + totalPrice, "store");
    this.addMoneyToRole("buyer");
    this.orderC++;
  }

  addMoneyToRole(role: string) {
      this.storeMoney += this.orderPrice;
      this.fireConnectionService.updateMoney({money: `${this.storeMoney}`}, "store");
  }

  //turns id for select element into array of items
  getDropDownItemArray(elementID:string){
    let element = document.getElementById(elementID);
    const valueArray = element?.innerText.split('\n');

    if(valueArray != null){
      return valueArray;
    } else {
      return null;
    }
  }

  approveOrderSubmit(){
    if(this.selectedOrder){
        this.fireConnectionService.approveOrder(this.selectedOrder.orderC);
    }
  }

  dissapproveOrderSubmit(){
    if(this.selectedOrder){
      this.fireConnectionService.dissapproveOrder(this.selectedOrder.orderC);
    }
  }
  retrieveGameData(){
    //create the reference towards the data list
    const orderRef = this.db.list("orders ");
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
              this.manufactureMoney = money;
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
  }
  async ngOnInit() {
    //connect to the firebase database as an anonymous user
    this.approveOrderSubmit();
    this.dissapproveOrderSubmit();
    this.fireConnectionService.deleteOrdersOnDisconnect();
    await this.fireConnectionService.loginAnonymously().then((userCredential) => {

    });
  }
}
