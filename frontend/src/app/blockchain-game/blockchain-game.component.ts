import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, of, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FireConectionService} from "../fire-conection.service";
import {Player} from "../../player";

@Component({
  selector: 'app-blockchain-game',
  templateUrl: './blockchain-game.component.html',
  styleUrls: ['./blockchain-game.component.css']
})



/* 3D Code part */


export class BlockchainGameComponent implements OnInit,AfterViewInit{



/*
  Blockchain code
 */

  dataBase: AngularFireDatabase;
  gameData$: Observable<any[]> = of([]);
  data : any[] | undefined;
  gameDataSubscription: Subscription | undefined;
  manuf!:string;
  cpu!:string;
  gpu!:string;
  orderC:number= 0;

  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
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



  orderData$: Observable<any[]> = of([]);
  orderData : any[] | undefined;
  moneyData$: Observable<any[]> = of([]);
  moneyData : any[] | undefined;
  moneyDataSubscription: Subscription | undefined;
  orderDataSubscription: Subscription | undefined;
  messagesSubscription: Subscription | undefined;
  messages: any[] = [];
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
  }
  titles = 'SupplyChain';
  // @ts-ignore
  senderGMaster : any;
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

  pushTextWithRole(text: string, role: string) {
    if(role == "buyer"){
      this.storeMoney += this.orderPrice;
      this.fireConnectionService.updateMoney({money: this.storeMoney}, "store");
    } else {
      this.storeMoney += this.orderPrice;
      this.fireConnectionService.updateMoney({money: this.storeMoney}, "manufacturer");    }
    // @ts-ignore
    let textToSend = this[text];
    console.log(text);
    // @ts-ignore
    this[text] = '';
    this.fireConnectionService.addTextToDatabase(textToSend, role);

  }

  storeToManufacturer(text: string, role: string) {
    this.pushTextWithRole(text, role);

    let manufMoney = this.manufactureMoney;
    manufMoney += (this.orderPrice * 0.8);

    this.fireConnectionService.updateMoney({money: manufMoney}, "manufacturer");
  }

  isMessageVisible(item?: any): boolean {
    // Check if the user's role allows viewing the item
    return this.currentRole === item.role;
  }
  ProductGood()
  {
    this.goodNumber++;
  }
  ProductBad()
  {
    this.badNumber++;
  }

  async ngOnInit(){
    this.retrieveData();
  }
  ngAfterViewInit() {
    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect();
    this.fireConnectionService.deleteMessageNodeOnDisconnect();
    this.fireConnectionService.deleteMoneyOnDisconnect();
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
  protected readonly Player = Player;
}
