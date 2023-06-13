import {Component, OnInit} from '@angular/core';
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
    this.fireConnectionService.createOrder(value.manuf, value.cpu, value.gpu, this.orderC, false);
    this.orderC++;
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
        console.log('Data updated:', data);
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
