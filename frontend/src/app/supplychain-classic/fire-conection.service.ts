import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Player} from "../../player";

@Injectable({
  providedIn: 'root',
})
export class FireConectionService {
  dataBase : AngularFireDatabase;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.dataBase = db;
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
      message: "",
      test: "1"
    }
    console.log("userID: ", uid);
    // Create a new node with the key and set the user data
    return this.db.object(`users/${Player.getInstance().id}`).set(userData);
  }

  updateUserData(newData: any) {
    //update user data
      this.db.database.ref(`users/`).once('value').then((snapshot) =>
        console.log(snapshot.numChildren()));
    return this.db.object(`users/${Player.getInstance().id}`).update(newData);
  }

  //deletes the user when they disconnect from the firebase database
  deleteUserNodeOnDisconnect() {
    const userNodeRef = this.db.database.ref(`users/${Player.getInstance().id}`);
    const msgNodeRef = this.db.database.ref(`/textsWithRoles`);

    userNodeRef.onDisconnect().remove()
      .then(() => {
        console.log("User node delete on disconnect");
      })
      .catch(error => {
        console.error("Failed to set up onDisconnect function", error);
      });
    msgNodeRef.onDisconnect().remove()
      .then(() => {
        console.log("Msg node delete on disconnect");
      })
      .catch(error => {
        console.error("Failed to set up onDisconnect function", error);
      });
  }
}
