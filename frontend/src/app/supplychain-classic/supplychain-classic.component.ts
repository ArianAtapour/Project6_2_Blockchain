import { Component } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "../fire-conection.service";
import {Observable, of, Subscription} from "rxjs";
import {Player} from "../../player";

@Component({
  selector: 'supplychain-classic',
  templateUrl: './supplychain-classic.html',
  styleUrls: ['./supplychain-classic.component.css']
})

export class SupplychainClassicComponent {
  dataBase : AngularFireDatabase;
  private messagesSubscription: Subscription | undefined;
  messages: any[] = [];
  currentRole : string = "";
  value : any | undefined;
  showGM: boolean = false;
  showStore: boolean = false;
  showFinancier: boolean = false;
  showFactory: boolean = false;
  showDelivery: boolean = false;

  constructor(private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
  }

  async ngOnInit() {
    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect();
    this.fireConnectionService.deleteMessageNodeOnDisconnect();
    //retrieve and subscribe to user data table
    this.messagesSubscription = this.fireConnectionService.getMessagesFromDatabase().subscribe(
      (items: any[]) => {
        this.messages = items;
      }
    );
    this.value = Player.getInstance().role;
    switch (this.value) {
      case "buyer":
        this.showGM = true;
        this.currentRole = this.value;
        break;

      case "store":
        this.showStore = true;
        this.currentRole = this.value;
        this.fireConnectionService.createMoneyNode(500, this.value);
        break;

      case "financier":
        this.showFinancier = true;
        this.currentRole = this.value;
        break;

      case "manufacturer":
        this.showFactory = true;
        this.currentRole = this.value;
        this.fireConnectionService.createMoneyNode(350, this.value);
        break;

      case "delivery":
        this.showDelivery = true;
        this.currentRole = this.value;
        break;
    }
  }
  titles = 'SupplyChain';
  // @ts-ignore
  senderGMaster : any;
  // @ts-ignore
  senderFinancier : any;
  // @ts-ignore
  senderStore: any;
  // @ts-ignore
  senderFactory: any;
  // @ts-ignore
  senderDelivery: any;

  goodNumber : number = 0;
  badNumber : number = 0;

  pushTextWithRole(text: string, role: string) {
    // @ts-ignore
    text = this[text];
    this.fireConnectionService.addTextToDatabase(text, role);
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
}
