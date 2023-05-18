import { Component } from '@angular/core';
import { Blockchain } from "../blockchain";
import {Block} from "../block";

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent {
  blockchain: Blockchain;

  constructor() {
    this.blockchain = new Blockchain();
  }

  pushToBlockchain(block: Block) {
    this.blockchain.pushToBlockchain(block);
  }

}
