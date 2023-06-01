import {Inject, Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Department, Block, Product, Checklist} from "../models/interfaces";
import { plainToClass } from 'class-transformer';
import {ChecklistClass, DepartmentClass,} from "./classes";
import {createChecklist} from "../models/products";

@Injectable({ providedIn: 'root' })

export class DataService {
  private _blocks: Block[] = [];
  blocksData: Observable<Block[]> | null = null;

  constructor(private database: AngularFireDatabase) {
    this.retrieveAllBlocks();
  }

  retrieveAllBlocks() {
    const blocksRef: AngularFireList<any> = this.database.list('blocks');
    this.blocksData = blocksRef.valueChanges().pipe(
      map((blocks: any[]) => {
        const transformedBlocks = blocks.map(block => this.mapDatabaseToBlock(block));
        this._blocks = transformedBlocks;
        this.sortBlocks();
        return transformedBlocks;
      })
    );
  }


  mapDatabaseToBlock(blockData: any): Block {
    const departmentData: Department = {
      id: blockData.department.id,
      name: blockData.department.name,
      description: blockData.department.description,
    };

    const department = departmentData as Department;
    const product: Product = {
      id: blockData.product.id,
      name: blockData.product.name,
      description: blockData.product.description,
    };

    const checklist = createChecklist(product.id);

    const block: Block = {
      hash: blockData.hash,
      department: department,
      message: blockData.message,
      timestamp: new Date(blockData.timestamp),
      product: product,
      checklist: checklist,
    };

    // Update the checklist properties based on the blockData
    if (blockData.checklist) {
      if (blockData.checklist.hasProduct) {
        Checklist.firstStepDone(block.checklist);
      }
      if (blockData.checklist.buyerToFinance) {
        Checklist.secondStepDone(block.checklist);
      }
      if (blockData.checklist.financeToBuyer) {
        Checklist.thirdStepDone(block.checklist);
      }
      if (blockData.checklist.buyerToProducer) {
        Checklist.fourthStepDone(block.checklist);
      }
      if (blockData.checklist.producerToFinance) {
        Checklist.fifthStepDone(block.checklist);
      }
      if (blockData.checklist.financeToProducer) {
        Checklist.sixthStepDone(block.checklist);
      }
      if (blockData.checklist.producerToShipper) {
        Checklist.seventhStepDone(block.checklist);
      }
      if (blockData.checklist.shipperToFinance) {
        Checklist.eighthStepDone(block.checklist);
      }
      if (blockData.checklist.financeToShipper) {
        Checklist.ninthStepDone(block.checklist);
      }
      if (blockData.checklist.shipperToProducer) {
        Checklist.tenthStepDone(block.checklist);
      }
      if (blockData.checklist.producerToBuyer) {
        Checklist.eleventhStepDone(block.checklist);
      }
      if (blockData.checklist.buyerToClient) {
        Checklist.twelfthStepDone(block.checklist);
      }
    }


    return block;
  }

  // handleChecklist(checklist: Checklist) {
  //   if (checklist.hasProduct) {
  //     Checklist.firstStepDone(checklist);
  //   }
  //   if (checklist.approvedByFinance) {
  //     Checklist.secondStepDone(checklist);
  //   }
  // }

  async makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return result;
  }

  pushBlock(block: Block) {
    const timestamp = new Date();
    Block.setTimestamp(block, timestamp);
    this.database.object('/blocks/' + Block.getHash(block)).update({
      product: block.product,
      hash: block.hash,
      department: block.department,
      message: block.message,
      timestamp: timestamp.getTime(),
      checklist: block.checklist,
    });

    this._blocks.push(block);
    this.sortBlocks();
  }

  sortBlocks() {
    this._blocks.sort((blockA, blockB) => {
      const timestampA = blockA.timestamp ? blockA.timestamp.getTime() : 0;
      const timestampB = blockB.timestamp ? blockB.timestamp.getTime() : 0;
      return timestampA - timestampB;
    });
  }

  hashIt(str1: string, str2: string, num: number) {
    const combinedString = str1 + str2 + num.toString();

    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
      const charCode = combinedString.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash |= 0; // Convert to 32-bit integer
    }

    return hash;
  }

  get blocks() {
    return this._blocks;
  }
}
