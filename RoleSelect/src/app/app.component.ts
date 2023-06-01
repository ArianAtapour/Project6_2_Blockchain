import { Component } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "./fire-conection.service";
import {Observable, of, Subscription} from "rxjs";
import {Player} from "../player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoleSelect';
  dataBase : AngularFireDatabase;
  gameData$: Observable<any[]> = of([]);
  data : any[] | undefined;
  gameDataSubscription: Subscription | undefined;
  previousName : string = "";

  //warning strings
  nameTakenWarning: any;
  roleTakenWarning: any;

  //flag for if username is taken
  nameIsTaken = false;
  //flag for if role is taken
  roleIsTaken = false;

  constructor(private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
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
    }).catch((error) => {
      console.error('login failed', error);
    });

    //create the user and update the table accordingly
    console.log(Player.getInstance().id);
    this.fireConnectionService.createUserData(Player.getInstance().id)
      .then(() => {
        console.log('User data created successfully');
      })
      .catch((error) => {
        console.error('Failed to create user data:', error);
      });

    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect();

    //retrieve and subscribe to user data table
    this.retrieveGameData();
  }

  //update the table and subscribe to the change event if not done yet
  retrieveGameData(){
    //create the reference towards the data list
    const playerRef = this.db.list("users");
    //define the table as the data of the users table
    this.gameData$ = playerRef.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.gameDataSubscription){
      this.gameDataSubscription = this.gameData$.subscribe((data) => {
        console.log('Data updated:', data);
        //update method
        this.data = data;
      });
    }
    //update method

  }

  //add the players data, first check if possibilities are not taken
  onSubmit(value: any) {
    this.nameIsTaken = false;
    this.roleIsTaken = false;

    //check to see if username or role was taken
    if (this.data) {
      this.data.forEach((playerData) => {
        //check name
        if(value.name == this.previousName){

        } else {
          if(playerData.name == value.name){
            this.nameIsTaken = true;
            console.log("playerName: " + playerData.name);
            console.log("valueName: " + value.name);
            //this.nameTakenWarning = "username already taken, please pick another name"
          }

          //check role
          if(playerData.role == value.role){
            this.roleIsTaken = true;
            console.log("playerRole: " + playerData.role);
            console.log("valueRole: " + value.role);
            //this.roleTakenWarning = "role already taken, please pick another role"
          }
        }
      });
    }

    if(this.nameIsTaken){
      this.nameTakenWarning = "name is taken, please try another";
    } else {
      this.previousName = value.name;
      this.nameTakenWarning = "";
    }

    if(this.roleIsTaken){
      this.roleTakenWarning = "role is taken, please try another";
    } else {
      this.roleTakenWarning = "";
    }

    //if both role and name is taken are false then add them to the DB
    if(!this.nameIsTaken && !this.roleIsTaken){
      this.fireConnectionService.updateUserData({
        name: value.name,
        role: value.role
      })
        console.log("Data sent: " + value.name + " and " + value.role);
    }
  }
}
