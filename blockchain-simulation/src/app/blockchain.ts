import { Block } from "./block";

export class Blockchain {
  blocks: Block[] = [];

  constructor() { }

  pushToBlockchain(block: Block) {
    this.blocks.push(block);
  }

}
