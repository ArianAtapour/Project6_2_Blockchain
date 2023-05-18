import { Component, Output, EventEmitter } from '@angular/core';
// import { _the_specific_department } from '';
import { Department } from "../department";
import { Factory } from "../departments";
import {Block} from "../block";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  @Output() sendEvent = new EventEmitter<Block>();

  department = Factory;
  block;

  constructor(department: Department) {
    // this.department = department;
    this.department = Factory;
    this.block = {} as Block;
  }

  createBlock(message: string, status: string) {
    this.block.department = this.department;
    this.block.message = message;
    this.block.status = ( status == 'true' );
    this.sendBlock();
  }

  sendBlock() {
    this.sendEvent.emit(this.block);
  }



}
