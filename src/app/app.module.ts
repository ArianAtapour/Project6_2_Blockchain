import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { ImageComponentComponent } from './image-component/image-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    ImageComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
