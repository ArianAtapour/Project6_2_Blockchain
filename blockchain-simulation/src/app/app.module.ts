import { NgModule, Component, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { ShowInfoComponent } from './show-info/show-info.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    BlockchainComponent,
    ShowInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
