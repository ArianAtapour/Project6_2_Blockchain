import { Department } from "./department/department";
import {Inject, Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class Block {
  department: Department;
  message: string;
  hash: number;

  constructor(department: Department, @Inject(String) message: string) {
    this.department = department;
    this.message = message;
    this.hash = 0;
  }

  static createBlock(department: Department, message: string) {
    return new Block(department, message);
  }

  getHash(){
    return this.hash;
  }
  getDepartment() {
    return this.department;
  }
  getId() {
    return this.getDepartment().getId();
  }
  getName() {
    return this.getDepartment().getName();
  }
  getDescription() {
    return this.getDepartment().getDescription();
  }
  getMessage() {
    return this.message;
  }
  setHash(hash: number) {
    this.hash = hash;
  }
}
