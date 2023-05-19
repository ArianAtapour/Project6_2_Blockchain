import { Component } from '@angular/core';
import { Block } from "../block";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent {
  blocks: Block[];

  constructor(blocks: Block[]) {
    this.blocks = blocks;
  }

  getBlock(index: number) {
    return this.blocks[index];
  }

}
