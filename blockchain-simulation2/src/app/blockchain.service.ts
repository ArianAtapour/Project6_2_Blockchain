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
  sendBlockToBlockchain(block: Block) {
    block.setHash(this.hashIt(block.getName(), block.getMessage()));
    this.blocks.push(block);
  }

  hashIt(str1: string, str2: string): number {
    const combinedString = str1 + str2;

    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
      const charCode = combinedString.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash |= 0; // Convert to 32-bit integer
    }

    return hash;
  }

  getBlocks() {
    return this.blocks;
  }
}
