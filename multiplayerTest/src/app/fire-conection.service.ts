import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
      x: 0,
      y: 0,
      //users skin or appearance
      skin: "https://www.nicepng.com/png/full/12-129543_kreygasm-emote-png-kappa-twitch-emote-png.png"
    }
    console.log("userID: ", uid);
    // Create a new node with the key and set the user data
    return this.db.object(`users/${uid}`).set(userData);
  }

  updateUserData(uid: string, newData: any) {
    //update user data
    return this.db.object(`users/${uid}`).update(newData);
  }

  //deletes the user when they disconnect from the firebase database
  deleteUserNodeOnDisconnect(uid: string) {
    const userNodeRef = this.db.database.ref(`users/${uid}`);

    userNodeRef.onDisconnect().remove()
      .then(() => {
        console.log("User node delete on disconnect");
      })
      .catch(error => {
        console.error("Failed to set up onDisconnect function", error);
      });
  }
}
