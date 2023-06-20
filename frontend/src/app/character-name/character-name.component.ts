import { Component } from '@angular/core';
import { CommonModule} from "@angular/common";
import { Router, Routes } from '@angular/router';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "../fire-conection.service";
import {Player, Role} from "../../player";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {Observable, of, Subscription, take, timer} from "rxjs";
import {SupplychainClassicComponent} from "../supplychain-classic/supplychain-classic.component";
import {CONFIG} from "@angular/fire/compat/analytics";

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
  timeLeft:number = 5;
  allRoles:string[] = ["buyer", "store", "manufacturer", "shipper", "financier"];
  availableRoles:string[] = ["buyer", "store", "manufacturer", "shipper", "financier"];

  //warning strings
  nameTakenWarning: any;

  //flag for if username is taken
  nameIsTaken = false;
  //flag for if role is taken
  roleIsTaken = false;

  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
    console.log(this.fireConnectionService.getMoneyFromManufacturer());
    //this.fireConnectionService.addMoneyToNode(1000,'manufacturer');
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
    }).catch((error) => {
      console.error('login failed', error);
    });

    //create the user and update the table accordingly
    this.fireConnectionService.createUserData(Player.getInstance().id)
      .then(() => {
      })
      .catch((error) => {
        console.error('Failed to create user data:', error);
      });

    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect();
    this.fireConnectionService.deleteMessageNodeOnDisconnect();
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
        //update method
        this.data = data;
        let takenRoles : string[] = [];
        //add number of valid players
        if(this.data){
          this.readyPlayers = 0;
          this.playersWhoVoted = 0;
          this.counterStatic = 0;
          this.counterBlock= 0;

          this.allRoles = ["buyer", "store", "manufacturer", "shipper", "financier"];

          this.availableRoles = [];
          takenRoles = [];

          this.data.forEach((playerData) => {
            if(playerData.name != "" && playerData.role != ""){
              this.readyPlayers++;
              if(playerData.vote != "")
              {
                this.playersWhoVoted++;
              }

              if(playerData.vote == "0"){
                this.counterStatic++;
              }

              if(playerData.vote=="1"){
                this.counterBlock++;
              }

              this.allRoles.forEach((role) => {
                if(role == playerData.role){
                  takenRoles?.push(role);
                }
              })

              //replace with 2 to test easier
              if(this.playersWhoVoted >= 2)
              {
                this.startGame();
              }
            }
          });
          //add back the not taken roles to the list
          if(takenRoles != null) {
            this.allRoles.forEach((roles) => {
              if(!takenRoles?.includes(roles, 0)){
                this.availableRoles.push(roles);
              }
            })
          } else {
            this.availableRoles = ["buyer", "store", "manufacturer", "shipper", "manufacturer"]
          }
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

    //check to see if username or role was taken
    if (this.data) {
      this.data.forEach((playerData) => {
        //check name
        if(value.name == this.previousName){
          //don't check name
        } else {
          if(playerData.name == value.name){
            this.nameIsTaken = true;
            this.nameTakenWarning = "username already taken, please pick another name"
          }
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

    //if both role and name is taken are false then add them to the DB and add to local player
    if(!this.nameIsTaken && value.name != ""){
      this.fireConnectionService.updateUserData({
        name: value.name,
        role: value.role
      })
      Player.getInstance().name = value.name;
      Player.getInstance().role = value.role;
    }
  }

  onStaticGameClick() {
    //check if role and name is in db if so add vote
    if(this.checkIfNameAndRole()){
      let text = "0";
      this.fireConnectionService.updateUserData({vote: text});
      this.resetTimer();
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
  intervalId: any;
  selectedRole: any;
  startGame() {
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft == 1) {
        clearInterval(this.intervalId);
        // Unsubscribe from any existing timer subscription
        this.timerSubscription?.unsubscribe();

        this.timerSubscription = timer(1000).subscribe(() => {
          this.fetchVotes();
          this.countVotes();
          console.log(this.votes);
          if (this.vote0Count > this.vote1Count) {
            this.router.navigate(['../supplychain-classic']);
          } else {
            this.router.navigate(['../supplychain-blockchain']);
          }
        });
      }
    }, 1000);
  }
  resetTimer(): void {
    // Unsubscribe from the current timer subscription
    this.timeLeft = 5;
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
