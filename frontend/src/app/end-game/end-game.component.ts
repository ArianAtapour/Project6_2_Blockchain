import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, of, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FireConectionService} from "../fire-conection.service";

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit{
  dataBase: AngularFireDatabase;
  gameData$: Observable<any[]> = of([]);
  data : any[] | undefined;
  gameDataSubscription: Subscription | undefined;

  manuf!:string;
  cpu!:string;
  gpu!:string;
  orderC:number= 0;
  orderApp:number=0;
  orderDec:number=0
  orderBoolean!:boolean;
  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
  }

  counterTrue = 0;
  counterFalse:number = 0;

 orderStatus(){
    //create the reference towards the data list
    const orders = this.db.list("orders");
    //define the table as the data of the users table
    this.gameData$ = orders.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.gameDataSubscription){
      this.gameDataSubscription = this.gameData$.subscribe((data) => {
        console.log('Data updated:', this.orderBoolean);
        //update method
        this.data = data;

        //add number of valid players
        if(this.data){
          this.manuf = "";
          this.cpu = "";
          this.gpu = "";



          //let counter = 1;

          this.data.forEach((order) => {
            this.orderBoolean = order.orderBoolean;

            if(order.orderBoolean === true){
              this.counterTrue++;
            }

            if(order.orderBoolean === false){
              this.counterFalse++;
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
  async ngOnInit(){
    this.orderStatus();
  }
}
