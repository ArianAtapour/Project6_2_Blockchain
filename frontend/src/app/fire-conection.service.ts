import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Player} from "../player";
import {getBoolean} from "@angular/fire/remote-config";
import {Observable, Subscription, take} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FireConectionService {
  dataBase : AngularFireDatabase;
  orderC = 0;
  private mgRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.dataBase = db;
    this.mgRef = db.list('textsWithRoles');

  }

  loginAnonymously() {
    return this.afAuth.signInAnonymously();
  }

  createUserData(uid: string){
    //default beginning data
    const userData = {
      //users coordinates
      name: "",
      role: "",
      vote: ""
    }
    console.log("userID: ", uid);
    // Create a new node with the key and set the user data
    return this.db.object(`users/${Player.getInstance().id}`).set(userData);
  }

  updateUserData(newData: any) {
    //update user data
    return this.db.object(`users/${Player.getInstance().id}`).update(newData);
  }

  addTextToDatabase(text: any, role: any): void {
    const data = {
      // @ts-ignore
      text : text,
      role: role
    };

    this.mgRef.push(data);
  }
  getMessagesFromDatabase(): Observable<any[]> {
    return this.mgRef.valueChanges();
  }
  //deletes the user when they disconnect from the firebase database
  deleteUserNodeOnDisconnect() {
    const userNodeRef = this.db.database.ref(`users/${Player.getInstance().id}`);
    userNodeRef.onDisconnect().remove()
      .then(() => {
        console.log("User node delete on disconnect");
      })
      .catch(error => {
        console.error("Failed to set up onDisconnect function", error);
      });
  }

  deleteMessageNodeOnDisconnect() {
    const messageNodeRef = this.db.database.ref(`textsWithRoles/`);
    messageNodeRef.onDisconnect().remove()
      .then(() => {
        console.log("Message node delete on disconnect");
      })
      .catch(error => {
        console.error("Failed to set up onDisconnect function", error);
      });
  }
  createMoneyNode(money:number, role:string){
    //default beginning data
    const moneyData = {
      //users coordinates
      money: money,
    }
    // Create a new node with the key and set the user data
    return this.db.object(`money/${role}`).set(moneyData);
  }
  private moneySubscription: Subscription | undefined;
  moneys: any[] = [];
  //disgusting code
 /* moneTai()
  {
    this.moneySubscription = this.db.list('money/manufacturer').valueChanges().subscribe(
      (items: any[]) => {
        return(items[0])
      }
    );
  }

  */
  async getMoney(role:string)
  {
  }
  addMoneyToNode(money:number, role:string) {
    // @ts-ignore
    let addedMoney: number = money + this.getMoney(role);
    const moneyData = {
      money: addedMoney,
    }
    // @ts-ignore
    return this.db.object(`money/${role}`).update(moneyData);
  }
  createOrder(manuf:string, cpu:string, gpu:string, orderC:number, orderConfirm:boolean, price:number){
    //default beginning data
    this.orderC = orderC;

    const orderData = {
      //users coordinates
      manuf: manuf,
      cpu: cpu,
      gpu: gpu,
      orderC:orderC,
      orderConfirm:orderConfirm,
      price:price
    }
    // Create a new node with the key and set the user data
    //this.orderC++;
    return this.db.object("orders/" + this.orderC).set(orderData);
  }

  approveOrder(orderNr:number){
    return this.db.object(`orders/${orderNr}`).update({orderConfirm:true});
  }

  dissapproveOrder(orderNr:number){
    return this.db.object(`orders/${orderNr}`).update({orderConfirm:false});
  }
  deleteOrdersOnDisconnect() {
    const orders = this.db.database.ref('orders/');

    orders.onDisconnect().remove()
      .then(() => {
        console.log("Orders data deleted on disconnect");
      })
      .catch(error => {
        console.error("Failed to set up onDisconnect function", error);
      });
  }
}
