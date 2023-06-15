import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { CharacterNameComponent } from './character-name/character-name.component';
import { MainComponent } from './main/main.component';
import { GameOverComponent } from './game-over/game-over.component';
import { SupplychainClassicComponent} from "./supplychain-classic/supplychain-classic.component";
import {OrdersComponent} from "./orders/orders.component";
import {BlockchainGameComponent} from "./blockchain-game/blockchain-game.component";

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'rules', component: RulesPageComponent },
  { path: 'character-name', component: CharacterNameComponent },
  { path: 'main', component: MainComponent },
  { path: 'game-over', component: GameOverComponent},
  { path: 'supplychain-classic', component: SupplychainClassicComponent },
  {path:'orders', component:OrdersComponent},
  {path:'supplychain-blockchain', component:BlockchainGameComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
