import { Injectable } from '@angular/core'
import {Department} from "./department";
import { Block } from "./block";

@Injectable({
  providedIn: 'root'
})
export class BlockInfoService {
  private _blocks: Array<Block> = new Array<Block>();
  constructor() {
    let department1: Department =  {name:"Financier", description:"Yo", color:2}
    let department2: Department =  {name:"Producer", description:"Hi", color:3}
    let department3: Department =  {name:"Buyer", description:"Hey", color:5}
    let test1: Block = {department: department1, message:"fuck yeah", status:true}
    let test2: Block = {department: department2, message:"hell yeah", status:true}
    let test3: Block = {department: department3, message:"oh yeah", status:true}

    this.blockAdd(test1);
    this.blockAdd(test2);
    this.blockAdd(test3);
  }

  blockAdd(block: Block) {
    this._blocks.push(block);
  }

  get blocks(): Array<Block> {
    return this._blocks;
  }
}
