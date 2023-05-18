import { Component } from '@angular/core';
import {Block} from "../block";
import { BlockInfoService } from "../block-info.service";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent {
  // blockchain: Blockchain;
  blocks = Array<Block>();
  index: number = 0;
  click: boolean = false;
  constructor(blockInfo: BlockInfoService) {
    this.blocks = blockInfo.blocks;
  }

  getBlockDepartment(block: Block)
  {
    return block.department;
  }

  getBlockDepartmentName(block: Block)
  {
    return this.getBlockDepartment(block).name;
  }

  getBlockDepartmentDescription(block: Block)
  {
    return this.getBlockDepartment(block).description;
  }

  getBlockDepartmentColor(block: Block): string
  {
    return this.getColor(this.getBlockDepartment(block).color)
  }

  getBlockMessage(block: Block)
  {
    return block.message;
  }

  getBlockStatus(block: Block)
  {
    return block.status;
  }
  pushToBlockchain(block: Block) {
    // this.block = block;
    // this.colorIndex = block.department.color;
    // this.color = this.getColor(this.colorIndex);
    this.blocks.push(block);
    console.log(block);
  }

  setIndex(i: number) {
    this.index = i;
    this.click = true;
  }

  getColor(index: number): string {
    switch (index)
    {
      case 1: return 'red';
      case 2: return 'green';
      case 3: return 'blue';
      case 4: return 'yellow';
      case 5: return 'pink';
      default: return 'black';
    }
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
}
