import { Department } from "./department";

export class Block {
  id: number;
  department: Department;
  message: string;

  constructor(id: number, department: Department, message: string) {
    this.id = id;
    this.department = department;
    this.message = message;
  }

  getId(){
    return this.id;
  }
  getDepartment() {
    return this.department;
  }
  getMessage() {
    return this.message;
  }

}
