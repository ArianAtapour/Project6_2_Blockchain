import {DepartmentComponent} from "./department.component";
import {Inject, Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class Department {
  id: number;
  name: string;
  description: string;

  constructor(@Inject(Number) id: number, @Inject(String) name: string, @Inject(String) description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static createDepartment(id: number, name: string, description: string) {
    return new Department(id, name, description);
  }

  static getColor(index: number): string {
    switch (index)
    {
      // case 1: return '#c37892';
      case 1: return '#FF8C83';
      case 2: return '#a2d0c0';
      case 3: return '#FF947D';
      case 4: return '#c094cc';
      case 5: return '#a4b6dd';
      default: return 'white';
    }
  }

  getId(){
    return this.id;
  }
  getName() {
    return this.name;
  }
  getDescription() {
    return this.description;
  }

}
