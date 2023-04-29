import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AnimelistComponent } from './animelist/animelist.component';
import { AnimeInfoService } from "./AnimeInfo.service";
import { AnimeadderComponent } from './animeadder/animeadder.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimelistComponent,
    AnimeadderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    AnimeInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
