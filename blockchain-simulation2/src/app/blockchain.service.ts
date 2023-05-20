import { Injectable } from '@angular/core';
import {Block} from "./block";
import {Department} from "./department/department";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private _blocks: Array<Block> = new Array<Block>();
  constructor() {
    let department1 = Department.createDepartment(1, "Client", "Peepee")
    let block1 = Block.createBlock(department1, "test");
    this.sendBlockToBlockchain(block1);

  }
  sendBlockToBlockchain(block: Block) {
    block.setHash(this.hashIt(block.getName(), block.getMessage()));
    this._blocks.push(block);
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

  get blocks() {
    return this._blocks;
  }
}
