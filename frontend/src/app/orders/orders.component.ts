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

  manuf!:string;
  cpu!:string;
  gpu!:string;
  orderC:number= 0;
  selectedOrder: any;
  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
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
    this.fireConnectionService.addTextToDatabase("Manufacturer: " + value.manuf + ", CPU: " + value.cpu + ", GPU: " + value.gpu + ", that costs " + totalPrice, "store");
    console.log(totalPrice);
    this.orderC++;
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
  retrieveData(){
    //create the reference towards the data list
    const orders = this.db.list("orders");
    //define the table as the data of the users table
    this.gameData$ = orders.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.gameDataSubscription){
      this.gameDataSubscription = this.gameData$.subscribe((data) => {
        //update method
        this.data = data;

        //add number of valid players
        if(this.data){
          this.manuf = "";
          this.cpu = "";
          this.gpu = "";

          let counter = 1;

          this.data.forEach((order) => {
            if(order.manuf != "" && order.gpu != "" && order.cpu != ""){
                this.manuf = order.manuf;
                this.cpu = order.cpu;
                this.gpu = order.gpu; //get the things
            }

            /*if(counter == 2){
              this.manuf = order.manuf;
              this.cpu = order.cpu;
              this.gpu = order.gpu;
            }else{
              counter++;
            }*/


          });
        }
      });
    }

  }
  async ngOnInit() {
    //connect to the firebase database as an anonymous user
    this.retrieveData();
    this.approveOrderSubmit();
    this.dissapproveOrderSubmit();
    this.fireConnectionService.deleteOrdersOnDisconnect();
    await this.fireConnectionService.loginAnonymously().then((userCredential) => {

    });
  }
}
