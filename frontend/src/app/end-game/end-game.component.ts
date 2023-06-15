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
  data : any[] | undefined;
  orderC: number = 0;
  orderSubscription: Subscription | undefined;
  orders : any[] = [];
  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
  }

  counterTrue : number = 0;
  counterFalse : number = 0;

  async ngOnInit() {

    this.orderSubscription = this.fireConnectionService.getOrdersFromDatabase().subscribe((items: any[]) => {
      this.orders = items;
      console.log(this.orders);
      this.countOrderTrueOrFalse();
      console.log(this.counterFalse);
    });
  }
  countOrderTrueOrFalse()
  {
    this.orders.forEach(item => {
      console.log(item.orderConfirm)
      if(item.orderConfirm == true)
      {
        console.log("adding one to true");
        this.counterTrue++;
      }
      else
      {
        console.log("adding one to false");
        this.counterFalse++;
      }
    });
  }
}
