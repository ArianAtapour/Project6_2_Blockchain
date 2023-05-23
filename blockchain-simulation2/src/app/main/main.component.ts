import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Department} from "../department/department";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  clicked: boolean;
  department: Department = {} as Department;
  departments: Department[] = [
    Department.createDepartment(1, "Client", "Wants things."),
    Department.createDepartment(2, "Buyer", "Buys things."),
    Department.createDepartment(3, "Financier", "Finances things."),
    Department.createDepartment(4, "Shipper", "Ships things."),
    Department.createDepartment(5, "Producer", "Produces things."),
  ];
  constructor(private router: Router) {
    this.clicked = false;
    this.department = this.departments[0];
  }
  ngOnInit(): void {};

  indexToDepartment(index: number) {
    this.clicked = true;
    switch (index) {
      case 0: this.department = this.departments[0]; break;
      case 1: this.department = this.departments[1]; break;
      case 2: this.department = this.departments[2]; break;
      case 3: this.department = this.departments[3]; break;
      case 4: this.department = this.departments[4]; break;
      default: break;
    }
  }

  getColor(index: number): string {
    switch (index)
    {
      case 1: return 'black';
      case 2: return '#baed91';
      case 3: return '#fea3aa';
      case 4: return '#f2a2e8';
      case 5: return '#faf884';
      default: return 'white';
    }
  }
  navigateToDepartment() {
    console.log("test");
    this.router.navigate(['/department']);
  }
}
