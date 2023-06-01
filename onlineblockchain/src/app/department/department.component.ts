import { Component } from '@angular/core';

import {Department, Block, Product, Checklist} from "../models/interfaces";
import { departments } from "../models/departments";
import { DataService } from "../services/data.service";
import {Data} from "@angular/router";
import {createChecklist, products} from "../models/products";



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  ds: DataService;

  department: Department = {} as Department;
  departments: Department[] = departments;

  menuVisibility = true;
  gameVisibility = false;

  productIndex: number = 0;
  constructor(ds: DataService) {
    this.ds = ds;
  }

  createDepartment(id: number, name: string, description: string): Department {
    return { id, name, description };
  }

  createBlock(message: string, department: Department, isApproved: boolean): Block {
    const product = this.products[this.productIndex];
    const checklist = createChecklist(product.id);
    this.handleChecklist(department, isApproved, checklist);
    const timestamp: Date = new Date();
    const hash: number = this.ds.hashIt(department.name, message, timestamp.getTime());

    return {
      hash: hash,
      product: product,
      department: department,
      message: message,
      timestamp: timestamp,
      checklist: checklist,
    };
  }


  //RULES
  handleChecklist(department: Department, isApproved: boolean, checklist: Checklist) {
    if (department && department.id === 2 && isApproved) {
      Checklist.firstStepDone(checklist);
    }
    if (checklist.hasProduct && department && department.id === 3 && isApproved) {
      Checklist.secondStepDone(checklist);
    }
  }






  public sendBlockToBlockchain(message: string, department: Department, isApproved: boolean) {
    const block: Block = this.createBlock(message, department, isApproved);
    this.ds.pushBlock(block);
  }

  switchVisibility() {
    this.menuVisibility = !this.menuVisibility;
    this.gameVisibility = !this.gameVisibility;
  }

  indexToDepartment(index: number) {
    this.switchVisibility();
    switch (index) {
      case 0: this.department = this.departments[0]; break;
      case 1: this.department = this.departments[1]; break;
      case 2: this.department = this.departments[2]; break;
      case 3: this.department = this.departments[3]; break;
      case 4: this.department = this.departments[4]; break;
      default: break;
    }
  }

  protected readonly Department = Department;
  protected readonly products = products;
}
