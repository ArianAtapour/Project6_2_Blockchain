import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Block } from "../blockchain/block";
import {Observable, of} from "rxjs";
import {plainToClass} from "class-transformer";
import { map, catchError } from 'rxjs/operators';
import {Department} from "../department/department";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db: AngularFireDatabase;
  private _blocks: Block[] = [];
  blocksData: Observable<Block[]> | null = null;
  constructor(private database: AngularFireDatabase) {
    this.db = database;
    this.retrieveAllBlocks();
  }

  retrieveAllBlocks() {
    const blocksRef: AngularFireList<any> = this.database.list('blocks');
    this.blocksData = blocksRef.valueChanges().pipe(
      map((blocks: any[]) => {
        const transformedBlocks = blocks.map(block => this.mapDatabaseToBlock(block));
        this._blocks = transformedBlocks; // Store the transformed blocks in _blocks
        this.sortBlocks(); // Sort the blocks
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

    // Convert the timestamp to a Date object
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

      // Add a delay of 100 milliseconds between each iteration
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return result;
  }

  pushBlock(block: Block) {
    const timestamp = new Date(); // Get the current timestamp
    block.setTimestamp(timestamp); // Set the timestamp for the block
    this.db.object('/blocks/' + block.getHash()).update({
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


  get blocks() {
    // this.sortBlocks();
    return this._blocks;
  }
}
