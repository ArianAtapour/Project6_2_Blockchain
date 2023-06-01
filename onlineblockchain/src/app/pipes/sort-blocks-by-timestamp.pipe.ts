import { Pipe, PipeTransform } from '@angular/core';
import { Block } from "../models/interfaces";

@Pipe({
  name: 'sortBlocksByTimestamp'
})
export class SortBlocksByTimestampPipe implements PipeTransform {
  transform(blocks: Block[]): Block[] {
    return blocks.sort((blockA, blockB) => blockA.timestamp.getTime() - blockB.timestamp.getTime());
  }
}
