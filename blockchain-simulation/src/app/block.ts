import { Department } from "./department";


import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class Block {
  department: Department = {} as Department;
  message: string = "";
  status: boolean = false;
}
