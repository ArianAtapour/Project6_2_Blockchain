import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent {
  @Input() hash: number;
  @Input() id: number
  @Input() name: string;
  @Input() description: string;
  @Input() message: string;

  constructor(hash: number, id: number, name: string, description: string, message: string) {
    this.hash = hash;
    this.id = id;
    this.name = name;
    this.description = description;
    this.message = message;
  }

}
