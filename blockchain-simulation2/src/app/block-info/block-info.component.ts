import {Component, Inject, Injectable, Input} from '@angular/core';

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class BlockInfoComponent {
  @Input() hash: number;
  @Input() id: number
  @Input() department: string;
  @Input() description: string;
  @Input() message: string;

  constructor() {
    this.hash = 0;
    this.id = 0;
    this.department = "";
    this.description = "";
    this.message = "";
  }

  getColor(index: number): string {
    switch (index)
    {
      case 1: return 'black';
      case 2: return '#baed91';
      case 3: return '#fea3aa';
      case 4: return '#f2a2e8';
      case 5: return '#faf884';
      default: return 'white';
    }
  }

}
