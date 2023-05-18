import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { _the_specific_department } from '';
import { Department } from "../department";
import { Client, Shipper, Buyer, Financier, Producer } from "../departments";
import {Block} from "../block";
import { BlockInfoService } from "../block-info.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  @Input() department: Department;
  @Output() sendEvent = new EventEmitter<Block>();

  blockInfo: BlockInfoService;
  block= {} as Block;
  status: boolean = false;
  selectedValue: string = '';

  constructor(department: Department, blockInfo: BlockInfoService) {
    // this.department = department;
    this.department = Client;
    this.blockInfo = blockInfo;
  }


  createBlock(message: string, status: string) {
    this.block.department = this.department;
    this.block.message = message;
    this.block.status = ( status == "true");
    this.sendBlock();
  }

  sendBlock() {
    // this.sendEvent.emit(this.block);
    let newBlock = new Block(this.block.department, this.block.message, this.block.status);
    this.blockInfo.blockAdd(newBlock);
  }


  protected readonly Block = Block;
}
