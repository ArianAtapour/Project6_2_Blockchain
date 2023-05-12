import { Component, OnInit, Input } from '@angular/core';
import { Qa } from '../qa';
import { POSTALCODE } from "../postalCode";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  @Input() qas: Qa[];
  private solvedPairs: Qa[] = [];
  private unsolvedPairs: Qa[] = [];
  public question: Qa;
  public choiceIndex: number;
  public clicked = false;
  constructor() { }
  ngOnInit() {
    console.log(
      this.question = POSTALCODE[Math.floor(Math.random()*POSTALCODE.length)]
    );
  }

  protected readonly POSTALCODE = POSTALCODE;
}
