import { Component } from '@angular/core';

import {Department, Block, Product, Checklist} from "../models/interfaces";
import { departments } from "../models/departments";
import { DataService } from "../services/data.service";
import {Data} from "@angular/router";
import {createChecklist, products} from "../models/products";
import {GameService} from "../services/game.service";



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  ds: DataService;
  gs: GameService;

  department: Department = {} as Department;
  departments: Department[] = departments;

  menuVisibility = true;
  gameVisibility = false;

  productIndex: number = 0;
  constructor(ds: DataService, gs: GameService) {
    this.ds = ds;
    this.gs = gs;
  }

  // updateChildButtonIndex() {
  //   // Loop through the departments and update the buttonIndex for each child component
  //   for (const department of this.departments) {
  //     department.buttonIndex = this.buttonIndex;
  //   }
  // }


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
  // 1 - Client
  // 2 - Buyer
  // 3 - Financier
  // 4 - Shipper
  // 5 - Producer
  handleChecklist(department: Department, isApproved: boolean, checklist: Checklist) {
    if (department && isApproved && department.id === 1) {
      Checklist.firstStepDone(checklist);
    }
    if (department && checklist.hasProduct && isApproved && department.id === 2) {
      Checklist.secondStepDone(checklist);
    }
    if (department && checklist.buyerToFinance && isApproved && department.id === 3) {
      Checklist.thirdStepDone(checklist);
    }
    if (department && checklist.financeToBuyer && isApproved && department.id === 2) {
      Checklist.fourthStepDone(checklist);
    }
    if (department && checklist.buyerToProducer && isApproved && department.id === 5) {
      Checklist.fifthStepDone(checklist);
    }
    if (department && checklist.producerToFinance && isApproved && department.id === 3) {
      Checklist.sixthStepDone(checklist);
    }
    if (department && checklist.financeToProducer && isApproved && department.id === 5) {
      Checklist.seventhStepDone(checklist);
    }
    if (department && checklist.producerToShipper && isApproved && department.id === 4) {
      Checklist.eighthStepDone(checklist);
    }
    if (department && checklist.shipperToFinance && isApproved && department.id === 3) {
      Checklist.ninthStepDone(checklist);
    }
    if (department && checklist.financeToShipper && isApproved && department.id === 4) {
      Checklist.tenthStepDone(checklist);
    }
    if (department && checklist.shipperToProducer && isApproved && department.id === 5) {
      Checklist.eleventhStepDone(checklist);
    }
    if (department && checklist.producerToBuyer && isApproved && department.id === 2) {
      Checklist.twelfthStepDone(checklist);
    }
    if (department && checklist.buyerToClient && isApproved && department.id === 2) {
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
