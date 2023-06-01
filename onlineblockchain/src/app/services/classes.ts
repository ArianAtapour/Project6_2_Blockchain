import {Checklist, Department} from "../models/interfaces";
import {Inject} from "@angular/core";

export class ChecklistClass implements Checklist {
  hasProduct: boolean;
  approvedByFinance: boolean;

  constructor(checklist: Checklist) {
    this.hasProduct = false;
    this.approvedByFinance = false;
  }
}



export class DepartmentClass implements Department {
  constructor(@Inject(Number) public id: number, @Inject(String) public name: string, @Inject(String) public description: string) {}
}
