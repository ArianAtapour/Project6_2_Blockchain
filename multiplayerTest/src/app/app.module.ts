import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment} from "../environments/environment";
import { AngularFireModule} from "@angular/fire/compat";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component} from "@angular/core";
import { AngularFireDatabase} from "@angular/fire/compat/database";
import { Injectable} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
