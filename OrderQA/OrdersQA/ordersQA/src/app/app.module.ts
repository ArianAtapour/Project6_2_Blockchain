import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { Game1Component } from './game1/game1.component';
import { Game2Component } from './game2/game2.component';
import { TimeLeftComponent } from './timeLeft/timeLeft.component';
import { TriggerComponent } from './trigger/trigger.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    Game1Component,
    Game2Component,
    TimeLeftComponent,
    TriggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
