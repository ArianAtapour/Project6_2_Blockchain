import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { BlockchainComponent } from './blockchain/blockchain.component';

import { Department } from "./department";
import { Factory } from "./testDepartment";
import { Block } from "./block";
import { Blockchain } from "./blockchain";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    BlockchainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
