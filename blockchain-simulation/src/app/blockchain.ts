import { Block } from "./block";

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Blockchain {
  blocks: Block[] = [];

  constructor() { }

  pushToBlockchain(block: Block) {
    this.blocks.push(block);
  }

}
