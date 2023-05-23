import { Injectable } from '@angular/core';
import {Block} from "../blockchain/block";
import {Department} from "../department/department";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private _blocks: Array<Block> = new Array<Block>();
  fb: FirebaseService;
  constructor(private firebaseService: FirebaseService) {
    this.fb = firebaseService;
    // firebaseService.getAllBlocks();
  }
  sendBlockToBlockchain(block: Block) {
    const now = new Date();
    block.setHash(this.hashIt(block.getName(), block.getMessage(), now.getTime()));
    block.setTimestamp(now);
    this.fb.pushBlock(block);
    // this.sortBlocks();
  }

  sortBlocks() {
    this._blocks.sort((blockA, blockB) => blockA.timestamp.getTime() - blockB.timestamp.getTime());
  }

  hashIt(str1: string, str2: string, num: number) {
    const combinedString = str1 + str2 + num.toString();

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
