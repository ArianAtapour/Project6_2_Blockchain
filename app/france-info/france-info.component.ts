import { Component } from '@angular/core';

@Component({
  selector: 'app-france-info',
  template: `
    <h2>Boring facts about France</h2>
    <ul>
      <li *ngFor="let fact of interestingFacts">{{ fact }}</li>
    </ul>
  `,
  styles: [`
    :host {
      background-image: url('https://www.planetware.com/photos-large/F/france-eiffel-tower.jpg');
      background-size: cover;
      display: block;
      height: 1000px;
    }

    h2 {
      color: purple;
      text-align: center;
      padding-top: 100px;
    }

    ul {
      color: purple;
      list-style-type: none;
      text-align: center;
    }

    li {
      margin: 10px 0;
      font-size: 20px;
    }
  `]
})
export class FranceInfoComponent {
  interestingFacts = [    'The Eiffel Tower was originally intended to be a temporary structure.',    'The French consume more cheese per capita than any other country in the world.',    'The Louvre museum in Paris is the most visited museum in the world.',    'French is the official language of 29 countries.',    'The French invented champagne.', 'The French stink like garlic'  ];
}
