import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '../department/department';
import { Block } from '../blockchain/block';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
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
    const departmentData = {
      id: blockData.department.id,
      name: blockData.department.name,
      description: blockData.department.description
    };

    const department = plainToClass(Department, departmentData);

    const block = Block.createBlock(department, blockData.message);
    block.setHash(blockData.hash);

    const timestamp = new Date(blockData.timestamp);
    block.setTimestamp(timestamp);

    return block;
  }

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
    block.setTimestamp(timestamp);
    this.database.object('/blocks/' + block.getHash()).update({
      hash: block.hash,
      department: block.department,
      message: block.message,
      timestamp: timestamp.getTime(),
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