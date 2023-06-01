import {Component, Injectable} from '@angular/core';
import { DataService } from "../services/data.service";
import {Department, Block, Product} from "../models/interfaces";
import {products} from "../models/products";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent {
  blocks: Block[];
  index: number;
  click: boolean
  ds: DataService;

  constructor(dataService: DataService) {
    this.ds = dataService;
    this.blocks = this.ds.blocks;
    this.ds.blocksData?.subscribe(() => this.updateBlockchain());
    this.index = -1;
    this.click = false;
    this.sortBlocks();
  }

  ngOnInit(): void {};

  updateBlockchain() {
    this.blocks = this.ds.blocks;
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

  getBlockProduct(block: Block) {
    return Block.getProduct(block);
  }

  getBlockHash(block: Block) {
    return Block.getHash(block);
  }

  getBlockDepartment(block: Block) {
    return Block.getDepartment(block);
  }

  getBlockDepartmentId(block: Block) {
    return Department.getId(block.department);
  }

  getBlockDepartmentName(block: Block) {
    return Department.getName(block.department);
  }
  getBlockDepartmentDescription(block: Block) {
    return Department.getDescription(block.department);
  }
  getBlockMessage(block: Block) {
    return Block.getMessage(block);
  }
  getBlockProductName(block: Block) {
    return Product.getName(block.product);
  }
  getBlockChecklist(block: Block) {
    return Block.getChecklist(block);
  }
  protected readonly Department = Department;
  protected readonly Block = Block;
  protected readonly Product = Product;
}
