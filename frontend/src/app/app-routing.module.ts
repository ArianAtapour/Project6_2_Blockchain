import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { RulesPageComponent } from './rules-page/rules-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'rules', component: RulesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
