import { Component } from '@angular/core';
import { Block } from "./block";
import { BlockchainService } from "../services/blockchain.service";
import {FirebaseService} from "../services/firebase.service";
import {Department} from "../department/department";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent {
  blocks: Block[];
  index: number;
  click: boolean
  fb: FirebaseService;

  constructor(blockchainService: BlockchainService, firebaseService: FirebaseService) {
    this.fb = firebaseService;
    this.blocks = this.fb.blocks;
    this.fb.blocksData?.subscribe(() => this.updateBlockchain());
    this.index = -1;
    this.click = false;
    this.sortBlocks();
  }

  ngOnInit(): void {};

  updateBlockchain() {
    this.blocks = this.fb.blocks;
    // this.sortBlocks();
  }

  sortBlocks() {
    this.blocks.sort((blockA, blockB) => blockA.timestamp.getTime() - blockB.timestamp.getTime());
  }

  setIndex(index: number) {
    this.click = true;
    this.index = index;
    console.log(this.blocks[index].timestamp);
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
  getBlock(index: number) {
    return this.blocks[index];
  }

  protected readonly Department = Department;
}
