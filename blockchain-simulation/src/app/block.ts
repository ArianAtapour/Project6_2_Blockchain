import { Department } from "./department";


import {Inject, Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class Block {
  public department: Department = {} as Department;
  message: string = "";
  status: boolean = false;

  constructor(department: Department, @Inject(String) message: string, @Inject(Boolean) status: boolean) {
    this.department = department;
    this.message = message;
    this.status = status;
  }
}
