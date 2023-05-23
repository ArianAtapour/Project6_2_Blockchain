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

  getColor(index: number): string {
    switch (index)
    {
      case 1: return 'black';
      case 2: return '#baed91';
      case 3: return '#fea3aa';
      case 4: return '#f2a2e8';
      case 5: return '#faf884';
      default: return 'white';
    }
  }

  sendBlockToBlockchain(message: string) {
    this.blockchainService.sendBlockToBlockchain(this.createBlock(message));
  }



}
