import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { CharacterNameComponent } from './character-name/character-name.component';
import { MainComponent } from './main/main.component';
import {FormsModule} from "@angular/forms";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {QuestionComponent} from "./question/question.component";
import {GameOverComponent} from "./game-over/game-over.component";
import {SupplychainClassicComponent} from "./supplychain-classic/supplychain-classic.component";
import {NgOptimizedImage} from "@angular/common";
import { OrdersComponent } from './orders/orders.component';
import { BlockchainGameComponent } from './blockchain-game/blockchain-game.component';
import { EndGameComponent } from './end-game/end-game.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    RulesPageComponent,
    CharacterNameComponent,
    MainComponent,
    GameOverComponent,
    QuestionComponent,
    SupplychainClassicComponent,
    OrdersComponent,
    BlockchainGameComponent,
    EndGameComponent,
    QuestionsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule,
        FormsModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
