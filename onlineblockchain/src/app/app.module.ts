import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { DepartmentComponent } from './department/department.component';
import { BlockchainComponent } from './blockchain/blockchain.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    BlockchainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
