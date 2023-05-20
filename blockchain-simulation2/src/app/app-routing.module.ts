import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DepartmentComponent} from "./department/department.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  {path: '', redirectTo: 'MainComponent', pathMatch: 'full'},
  {path: 'department', component: DepartmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
