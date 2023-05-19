import { Injectable } from '@angular/core';
import {Block} from "./block";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  blocks: Block[];
  constructor() {
    this.blocks = { } as Block[];
  }
  pushToBlockchain(block: Block) {
    this.blocks.push(block);
  }
  getBlocks() {
    return this.blocks;
  }
}
