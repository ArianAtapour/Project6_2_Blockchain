import {Component, Inject, Input, Output} from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService } from "../services/blockchain.service";
import {Department} from "./department";
import {Block} from "../blockchain/block";


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  @Input() department: Department = {} as Department;
  @Output() block: Block | null = null;
  blockchainService: BlockchainService

  constructor(blockchainService: BlockchainService) {
    this.blockchainService = blockchainService;
  }

  ngOnInit(): void {};

  createBlock(message: string) {
    return Block.createBlock(this.department, message);
  }

  sendBlockToBlockchain(message: string) {
    this.blockchainService.sendBlockToBlockchain(this.createBlock(message));
  }


  protected readonly Department = Department;
}
