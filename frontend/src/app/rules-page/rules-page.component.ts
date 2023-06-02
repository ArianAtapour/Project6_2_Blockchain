import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.css']
})
export class RulesPageComponent {
 constructor(private router: Router) { }

  ngOnInit() {
  }

  goToNext() {
    this.router.navigate(['/game-over']);
  }
}
