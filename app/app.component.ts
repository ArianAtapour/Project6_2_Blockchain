import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="showFranceInfo()">{{ buttonText }}</button>
    <app-france-info *ngIf="showingFranceInfo"></app-france-info>
  `
})
export class AppComponent {
  buttonText = 'Show some horrible stuff about France';
  showingFranceInfo = false;

  showFranceInfo() {
    this.showingFranceInfo = !this.showingFranceInfo;
    this.buttonText = this.showingFranceInfo ? 'Hide the atrocious info' : 'Show some horrible stuff about France';
  }
}
