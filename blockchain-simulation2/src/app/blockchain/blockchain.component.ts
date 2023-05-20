import { Component } from '@angular/core';
import { Block } from "../block";
import { BlockchainService } from "../blockchain.service";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent {
  blocks: Block[];
  index: number;
  click: boolean

  constructor(blockchainService: BlockchainService) {
    this.blocks = blockchainService.blocks;
    this.index = -1;
    this.click = false;
  }

  ngOnInit(): void {};

  setIndex(index: number) {
    this.click = true;
    this.index = index;
  }

  getBlockHash(block: Block) {
    return block.getHash();
  }

  getBlockDepartment(block: Block) {
    return block.getDepartment();
  }

  getBlockDepartmentId(block: Block) {
    return this.getBlockDepartment(block).getId();
  }

  getBlockDepartmentName(block: Block) {
    return this.getBlockDepartment(block).getName();
  }
  getBlockDepartmentDescription(block: Block) {
    return this.getBlockDepartment(block).getDescription();
  }
  getBlockMessage(block: Block) {
    return block.getMessage();
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



  getBlock(index: number) {
    return this.blocks[index];
  }
}
