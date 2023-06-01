import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { DepartmentComponent } from './department/department.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { DepartmentMessageComponent } from './departmentUI/department-message/department-message.component';
import { BuyerMessageComponent } from './departmentUI/buyer-message/buyer-message.component';
import { ClientMessageComponent } from './departmentUI/client-message/client-message.component';
import { FinancierMessageComponent } from './departmentUI/financier-message/financier-message.component';
import { ShipperMessageComponent } from './departmentUI/shipper-message/shipper-message.component';
import { ProducerMessageComponent } from './departmentUI/producer-message/producer-message.component';
import { SpectatorMessageComponent } from './departmentUI/spectator-message/spectator-message.component';
import {DataService} from "./services/data.service";
import { BlockInfoComponent } from './block-info/block-info.component';
import { FormsModule } from '@angular/forms';
import { ProductChecklistComponent } from './product-checklist/product-checklist.component';
import { SortBlocksByTimestampPipe } from './pipes/sort-blocks-by-timestamp.pipe';
import { ReverseArrayPipe } from './pipes/reverse-array.pipe';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    BlockchainComponent,
    DepartmentMessageComponent,
    BuyerMessageComponent,
    ClientMessageComponent,
    FinancierMessageComponent,
    ShipperMessageComponent,
    ProducerMessageComponent,
    SpectatorMessageComponent,
    BlockInfoComponent,
    ProductChecklistComponent,
    SortBlocksByTimestampPipe,
    ReverseArrayPipe,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
