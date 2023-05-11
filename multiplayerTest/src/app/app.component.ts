import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//use on init
export class AppComponent implements OnInit, OnDestroy{
  title = 'multiplayerTest';
  dataBase : AngularFireDatabase;
  animeData$: Observable<any[]> | undefined;
  animeDataSubscription: Subscription | undefined;

  constructor(private db: AngularFireDatabase) {
    this.dataBase = db;
  }

  //initialize the table at the start of initialization
  ngOnInit(): void {
        this.retrieveAnimeData();
  }

  //when destroyed unsubscribe
  ngOnDestroy() {
    //if subscribed then unsubscribe
    if (this.animeDataSubscription) {
      this.animeDataSubscription.unsubscribe();
    }
  }

  addNewEntry(title: string, episodes: number){
    //defines the path of where the data will go
    const dataRef = this.dataBase.list("anime")

    //
    dataRef.push({title, episodes})
      //when that works then:
      .then(() => {
        console.log("Saved Data!!!");
      })
      //when an error occurs then:
      .catch((error) => {
        console.log("Error Saving Data...", error)
      })
  }

  //update the table and subscribe to the change event if not done yet
  retrieveAnimeData(){
    //create the reference towards the anime list
    const animeRef = this.db.list("anime");
    //define the anime table as the data of the anime table
    this.animeData$ = animeRef.valueChanges();

    //if the anime data subscription is not subbed yet then sub
    if(!this.animeDataSubscription){
      this.animeDataSubscription = this.animeData$.subscribe((data) => {
        console.log('Data updated:', data);

      });
    }
  }

  protected readonly Number = Number;
}
