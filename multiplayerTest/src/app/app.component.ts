import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {FireConectionService} from "./fire-conection.service";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'multiplayerTest';
  dataBase : AngularFireDatabase;
  playerData$: Observable<any[]> = of([]);
  playerDataSubscription: Subscription | undefined;
  grid: any[][] = [];
  x: number = 1;
  y: number = 1;
  userID: string = "";
  defaultSkin = "https://i.imgflip.com/3vx3wb.png?a467592"
  skin = this.defaultSkin;

  constructor(private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    this.dataBase = db;

  }

  //initialize the table at the start of initialization
  async ngOnInit() {
    //connect to the firebase database as an anonymous user
    await this.fireConnectionService.loginAnonymously().then((userCredential) => {
      //successfully made a user
      const user = userCredential.user;
      //if the user isn't null save the uid in a separate variable
      if (user) {
        this.userID = user.uid;
        console.log("user logged");
      }
      console.log('logged in succesfully', user);
    }).catch((error) => {
      console.error('login failed', error);
    });

    //create the user and update the table accordingly
    console.log(this.userID);
    this.fireConnectionService.createUserData(this.userID)
      .then(() => {
        console.log('User data created successfully');
        document.addEventListener('keyup', this.onKeyPress);
        this.updateTable();
      })
      .catch((error) => {
        console.error('Failed to create user data:', error);
      });

    //removes the node when the user leaves the webpage or disconnects
    this.fireConnectionService.deleteUserNodeOnDisconnect(this.userID);

    //retrieve and subscribe to user data table
    this.retrievePlayerData();
  }

  //update the table and subscribe to the change event if not done yet
  retrievePlayerData(){
    //create the reference towards the anime list
    const playerRef = this.db.list("users");
    //define the anime table as the data of the anime table
    this.playerData$ = playerRef.valueChanges();

    //if the anime data subscription is not subbed yet then sub
    if(!this.playerDataSubscription){
      this.playerDataSubscription = this.playerData$.subscribe((data) => {
        console.log('Data updated:', data);
        this.updateTable();
      });
    }
    this.updateTable();
  }

  //when destroyed unsubscribe
  ngOnDestroy() {

  }

  updateTable() {
    // Clear the grid array
    this.grid = [];

    // Initialize the grid with null values
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }

    // Populate the grid with player data
    if (this.playerData$) {
      this.playerData$.forEach((data) => {
        data.forEach((playerData) => {
          if (playerData.x >= 0 && playerData.x < 10 && playerData.y >= 0 && playerData.y < 10) {
            this.grid[playerData.y][playerData.x] = { skin: playerData.skin, uid: playerData.uid };
          }
        });
      });
    }
  }

  onKeyPress = (event: KeyboardEvent) => {
    //move Up, Down, Left Right
    if (event.keyCode === 87) {
      if(this.y > 0){
        this.y--;
        console.log("up ", this.x, ",", this.y);
        this.fireConnectionService.updateUserData(this.userID, {
          y: this.y,
        })
        this.updateTable();
      }
    } else if (event.keyCode === 83) {
      if(this.y < 9){
        this.y++;
        console.log("down ", this.x, ",", this.y);
        this.fireConnectionService.updateUserData(this.userID, {
          y: this.y,
        })
        this.updateTable();
      }
    } else if (event.keyCode === 65) {
      if(this.x > 0){
        this.x--;
        console.log("left ", this.x, ",", this.y);
        this.fireConnectionService.updateUserData(this.userID, {
          x: this.x,
        })
        this.updateTable();
      }
    } else if (event.keyCode === 68) {
      if(this.x < 9){
        this.x++;
        console.log("right ", this.x, ",", this.y);
        this.fireConnectionService.updateUserData(this.userID, {
          x: this.x,
        })
        this.updateTable();
      }
    }
  };

  //when submit is clicked check if valid image then set as users image and update
  onSubmit(data: any) {
    this.isValidImageUrl(data.skinUrl)
      .then((isValid) => {
        if (isValid) {
          console.log("valid image");
          this.fireConnectionService.updateUserData(this.userID,{
            skin: data.skinUrl
          });
        } else {
          console.log("invalid image");
        }
      })
      .catch((error) => {
        console.log("Error occurred or invalid URL");
      });
  }

  //checks if the url put inside the box is an actual image by sending a request and seeing what it returns
  async isValidImageUrl(url: string): Promise<boolean> {
    try {
      console.log(url);
      const response = await fetch(url);
      const contentType = response.headers.get("content-type");
      //if it returns as an image success!!
      return contentType?.startsWith("image/") ?? false;
    } catch (error) {
      console.error("Error checking image URL:", error);
      return false;
    }
  }

  protected readonly Array = Array;
}
