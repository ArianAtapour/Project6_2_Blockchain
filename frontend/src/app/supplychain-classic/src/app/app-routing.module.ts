import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment} from "../environments/environment";
import { AngularFireModule} from "@angular/fire/compat";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
