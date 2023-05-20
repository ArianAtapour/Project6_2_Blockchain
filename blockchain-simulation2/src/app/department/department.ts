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
