import { Department } from "./department";

export class Block {
  department: Department;
  message: string;
  status: boolean;

  constructor(department: Department, message: string, status: boolean) {
    this.department = department;
    this.message = message;
    this.status = status;
  }
}
