import { Component } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "./fire-conection.service";
import {Observable, of, Subscription} from "rxjs";
import {Player} from "../../player";
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'supplychain-classic',
  templateUrl: './supplychain-classic.html',
  styleUrls: ['./supplychain-classic.component.css']
})

export class SupplychainClassicComponent {
  dataBase : AngularFireDatabase;
  data : any[] | undefined;
  msgData : any[] | undefined;
  private messagesSubscription: Subscription | undefined;
  messages: any[] = [];
  currentRole : string = "";

  constructor(private db: AngularFireDatabase, private fireConnectionService: FireConectionService, private firebaseService: FirebaseService) {
    //initialize database
    this.dataBase = db;
    const messageRef = this.db.list("messages");
  }

  async ngOnInit(){
    //connect to the firebase database as an anonymous user
    await this.fireConnectionService.loginAnonymously().then((userCredential) => {
      //successfully made a user
      const user = userCredential.user;
      //if the user isn't null save the uid in a separate variable
      if (user) {
        Player.getInstance().id = user.uid;
        console.log("user logged");
      }
      console.log('logged in succesfully', user);
    }).catch((error : any) => {
      console.error('login failed', error);
    });

    //create the user and update the table accordingly
    console.log(Player.getInstance().id);
    this.fireConnectionService.createUserData(Player.getInstance().id)
      .then(() => {
        console.log('User data created successfully');
      })
      .catch((error : any) => {
        console.error('Failed to create user data:', error);
      });

    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect();

    //retrieve and subscribe to user data table
    this.messagesSubscription = this.firebaseService.getItemsFromDatabase().subscribe(
      (items: any[]) => {
        this.messages = items;
      }
    );
  }

  incrementNumber() {
    this.db.object('counter').query.ref.transaction((currentValue) => {
      return (currentValue || 0) + 1;
    });
  }

  showForm: boolean = true;
  showGM: boolean = false;
  showStore: boolean = false;
  showFinancier: boolean = false;
  showFactory: boolean = false;
  showDelivery: boolean = false;
  selectedRole: string = "";

  toggleDiv(value: any) {
    console.log(value);
    switch (value)
    {
      case "gamemaster":
        this.showGM = true;
        this.fireConnectionService.updateUserData({
          role: value
        })
        console.log("Data sent: " + value.role);
        this.currentRole = value;
        break;

      case "store":
        this.showStore = true;
        this.fireConnectionService.updateUserData({
          role: value
        })
        console.log("Data sent: " + value.role);
        this.currentRole = value;
        break;

      case "financier":
        this.showFinancier = true;
        this.fireConnectionService.updateUserData({
          role: value
        })
        console.log("Data sent: " + value.role);
        this.currentRole = value;
        break;

      case "factory":
        this.showFactory = true;
        this.fireConnectionService.updateUserData({
          role: value
        })
        console.log("Data sent: " + value.role);
        this.currentRole = value;
        break;

      case "delivery":
        this.showDelivery = true;
        this.fireConnectionService.updateUserData({
          role: value
        })
        console.log("Data sent: " + value.role);
        this.currentRole = value;
        break;
    }
    this.showForm = false;
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
    this.firebaseService.addItemToDatabase(text, role);
  }
  isMessageVisible(item?: any): boolean {
    // Check if the user's role allows viewing the item
    return this.selectedRole === item.role;
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
