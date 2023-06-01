import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-name',
  templateUrl: './character-name.component.html',
  styleUrls: ['./character-name.component.css']
})
export class CharacterNameComponent {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToMain() {
    this.router.navigate(['/main']);
  }
}
