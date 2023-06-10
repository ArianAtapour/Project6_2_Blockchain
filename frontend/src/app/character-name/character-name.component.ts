import { Component } from '@angular/core';
import { CommonModule} from "@angular/common";
import { Router, Routes } from '@angular/router';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "../fire-conection.service";
import {Player, Role} from "../../player";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import {Observable, of, Subscription, timer} from "rxjs";
import {SupplychainClassicComponent} from "../supplychain-classic/supplychain-classic.component";

@Component({
  selector: 'app-character-name',
  templateUrl: './character-name.component.html',
  styleUrls: ['./character-name.component.css']
})
export class CharacterNameComponent {
  title = 'RoleSelect';
  dataBase : AngularFireDatabase;
  gameData$: Observable<any[]> = of([]);
  data : any[] | undefined;
  gameDataSubscription: Subscription | undefined;
  previousName : string = "";
  playersWhoVoted : number = 0;
  readyPlayers : number = 0;
  counterStatic:number = 0;
  counterBlock:number = 0;

  //warning strings
  nameTakenWarning: any;
  roleTakenWarning: any;

  //flag for if username is taken
  nameIsTaken = false;
  //flag for if role is taken
  roleIsTaken = false;

  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
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

        //add number of valid players
        if(this.data){
          this.readyPlayers = 0;
          this.playersWhoVoted = 0;
          this.counterStatic = 0;
          this.counterBlock= 0;
          this.data.forEach((playerData) => {
            if(playerData.name != "" && playerData.role != ""){
              this.readyPlayers++;
              if(playerData.vote != "")
              {
                this.playersWhoVoted++;
                console.log(this.playersWhoVoted + " boys");
              }

              if(playerData.vote == "0"){
                this.counterStatic++;
              }

              if(playerData.vote=="1"){
                this.counterBlock++;
              }

              //replace with 2 to test easier
              if(this.playersWhoVoted >= 4)
              {
                this.startGame();
              }
            }
          });
        }
      });
    }
  }

  goToMain() {
    this.router.navigate(['/main']);
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
          //don't check name
        } else {
            if(playerData.name == value.name){
              this.nameIsTaken = true;
              console.log("playerName: " + playerData.name);
              console.log("valueName: " + value.name);
              this.nameTakenWarning = "username already taken, please pick another name"
            }
          }
        //check role
        if(playerData.role == value.role){
          this.roleIsTaken = true;
          console.log("playerRole: " + playerData.role);
          console.log("valueRole: " + value.role);
          this.roleTakenWarning = "role already taken, please pick another role"
        }
      });
    }

    if(this.nameIsTaken){
      this.nameTakenWarning = "name is taken, please try another";
    } else {
      this.previousName = value.name;
      this.nameTakenWarning = "";
      Player.getInstance().name = "";
    }
    if(this.roleIsTaken){
      this.roleTakenWarning = "role is taken, please try another";
    } else {
      this.roleTakenWarning = "";
      Player.getInstance().role = Role.None;
    }

    //if both role and name is taken are false then add them to the DB and add to local player
    if(!this.nameIsTaken && !this.roleIsTaken){
      this.fireConnectionService.updateUserData({
        name: value.name,
        role: value.role
      })
      Player.getInstance().name = value.name;
      Player.getInstance().role = value.role;
      console.log("Data sent: " + value.name + " and " + value.role);
    }
  }

  onStaticGameClick() {
    //check if role and name is in db if so add vote
    if(this.checkIfNameAndRole()){
      let text = "0";
      this.fireConnectionService.updateUserData({vote: text});
      this.resetTimer();
      console.log("added vote");
    } else {
      console.log("invalid vote");
    }
  }

  onBlockchainGameClick() {
    //check if role and name is in db if so add vote
    if(this.checkIfNameAndRole()){
      let text = 1;
      this.fireConnectionService.updateUserData({vote: text});
      this.resetTimer();
      console.log("added vote");
    } else {
      console.log("invalid vote");
    }
  }

  //checks to see if player has a role and a name
  checkIfNameAndRole(){
    return Player.getInstance().name != "" && Player.getInstance().role != Role.None;
  }

  //voting for which game to play
  timerSubscription: Subscription | undefined;
  votes :any[] = [];
  vote0Count: number = 0;
  vote1Count: number = 0;
  startGame()
  {
    // Unsubscribe from any existing timer subscription
    this.timerSubscription?.unsubscribe();

    // Start a new timer that emits a value after 5 seconds
    this.timerSubscription = timer(5000).subscribe(() => {
      this.fetchVotes();
      console.log("votes fetched");
      this.countVotes();
      console.log(this.votes);
      if(this.vote0Count > this.vote1Count)
      {
        console.log("Navigating to classic");
        this.router.navigate(['../supplychain-classic']);
      }
      else
      {
        this.router.navigate(['../supplychain-classic']);
      }
    });
  }
  resetTimer(): void {
    // Unsubscribe from the current timer subscription
    this.timerSubscription?.unsubscribe();
  }
  fetchVotes() {
    this.votes = [];
    if(this.data)
    {
      this.data.forEach((playerData) => {
          this.votes.push(playerData.vote)
      });
    }
  }
  countVotes() {
    this.vote0Count = 0;
    this.vote1Count = 0;

    // @ts-ignore
    this.votes.forEach((vote) => {
      // @ts-ignore
      if (vote === "0") {
        this.vote0Count++;
      } else { // @ts-ignore
        if (vote === 1) {
                this.vote1Count++;
              }
      }
    });
  }
  goToHomepage(){
    this.router.navigate(['']);
  }
}
//bring the page to the main after making name
//TODO wait for 5 members before doing this also make it a different button
//this.router.navigate(['/main']);
//TODO Make a button that can choose which game type to play or start one then the other
